import fs from 'fs';


class AppController {
  upload = async (ctx) => {
    const { imagesFromPdf, idFirst, idSecond } = ctx;

    ctx.body = {
      success: true,
      files: imagesFromPdf,
      idFirst,
      idSecond,
    };
  }

  index = async (ctx) => {
    const fileNames = fs.readdirSync('./images');

    ctx.body = {
      success: true,
      fileNames,
    };
  }

  ocr = async (ctx) => {
    ctx.body = {
      success: true,
      ocrData: ctx.ocrData,
    };
  }

  pages = async (ctx) => {
    const {
      params: {
        firstId,
        secondId,
      },
    } = ctx;

    const files = fs.readdirSync(`./images/${firstId}-${secondId}`);

    ctx.body = {
      success: true,
      files,
    };
  }
}

export default new AppController();
