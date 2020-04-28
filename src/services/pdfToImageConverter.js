import fs from 'fs';
import http from 'http';
import PDF2Pic from 'pdf2pic';

export default async (ctx, next) => {
  const {
    pdfUrl,
    idFirst,
    idSecond,
  } = ctx;

  await new Promise((resolve, reject) => {
    try {
      const file = fs.createWriteStream(`./pdf/${idFirst}-${idSecond}.pdf`);
      const pdf2pic = new PDF2Pic({
        density: 100,
        savename: `${idFirst}-${idSecond}`,
        savedir: `./images/${idFirst}-${idSecond}`,
        format: 'png',
        size: '1920x1080',
      });

      http.get(pdfUrl, (response) => {
        response.pipe(file);
      });

      file.on('finish', async () => {
        file.close();

        const imagesFromPdf = await pdf2pic.convertBulk(`./pdf/${idFirst}-${idSecond}.pdf`, -1);

        Object.assign(ctx, {
          imagesFromPdf,
        });

        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });

  await next();
};
