import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mount from 'koa-mount';
import cors from '@koa/cors';

import ocrReader from 'services/ocrReader';
import pdfToImageConverter from 'services/pdfToImageConverter';
import urlConverter from 'services/urlConverter';

import appController from 'controllers/AppController';

const app = new Koa();
app.use(cors());

const router = new Router();

// Retrieving PDF and preparing images
router.post('/', urlConverter, pdfToImageConverter, appController.upload);

// Get all prepared pdf's
router.get('/', appController.index);

// Pages
router.get('/:firstId-:secondId', appController.pages);

// Get OCR result for PDF for page
router.get('/:firstId-:secondId/:page', ocrReader, appController.ocr);

app.use(mount('/images', serve(`${process.cwd()}/images`)));


app.use(bodyParser());
app.use(router.routes());

export default app;
