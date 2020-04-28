export default async (ctx, next) => {
  const {
    request: {
      body: {
        url,
      },
    },
  } = ctx;

  const regexp = /(?<=view_catalog)\/([0-9]+)\/([0-9]+)/;
  const matches = url.match(regexp);
  // eslint-disable-next-line no-unused-vars
  const [_, idFirst, idSecond] = matches;

  Object.assign(ctx, {
    pdfUrl: `http://www.publinfo.com/temp/catalogo-${idFirst}-${idSecond}.pdf`,
    idFirst,
    idSecond,
  });

  await next();
};
