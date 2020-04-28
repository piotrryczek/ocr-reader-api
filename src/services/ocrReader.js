import qs from 'qs';
import _isEmpty from 'lodash/isEmpty';

import ocrWorker from 'services/ocrWorker';

export default async (ctx, next) => {
  const {
    params: {
      firstId,
      secondId,
      page,
    },
    query,
  } = ctx;

  const queryParsed = qs.parse(query);

  const {
    top,
    left,
    width,
    height,
  } = queryParsed;

  const OCRWorderOptions = {};

  if (!_isEmpty(queryParsed)) {
    Object.assign(OCRWorderOptions, {
      rectangle: {
        top,
        left,
        width,
        height,
      },
    });
  }


  ocrWorker.setPage(page);
  const { data: { text: fullText, words } } = await ocrWorker.scan(`./images/${firstId}-${secondId}/${firstId}-${secondId}_${page}.png`, OCRWorderOptions);

  const data = {
    fullText,
    words: words.map(({ bbox, text, confidence }) => ({
      bbox,
      text,
      confidence,
    })),
  };

  Object.assign(ctx, {
    ocrData: data,
  });

  await next();
};
