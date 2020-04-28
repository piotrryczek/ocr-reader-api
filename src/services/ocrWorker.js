import { createWorker } from 'tesseract.js';
import PSM from 'tesseract.js/src/constants/PSM';
import OEM from 'tesseract.js/src/constants/OEM';

import ioServer from 'services/ioServer';

class OCRWorker {
  constructor() {
    this.worker = createWorker({
      logger: (message) => {
        console.log(this.page, message);

        if (message.status === 'recognizing text') {
          ioServer.send('ocrLoading', {
            progress: message.progress,
            page: +this.page,
          });
        }
      },
    });

    this.init();
  }

  setPage = (page) => {
    this.page = page;
  }

  init = async () => {
    await this.worker.load();
    await this.worker.loadLanguage('spa');
    await this.worker.initialize('spa');
    await this.worker.setParameters({
      preserve_interword_spaces: '1',
      tessedit_ocr_engine_mode: OEM.LSTM_ONLY,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
  }

  scan = async (url, options) => this.worker.recognize(url, options);
}

export default new OCRWorker();
