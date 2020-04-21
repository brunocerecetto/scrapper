import bodyParser from 'body-parser';
import cors from 'cors';
import App from './app';
import loggerMiddleware from './middlewares/logger';
import HomeController from './controllers/home/home.controller';

import 'dotenv/config';

const port: number = (process.env.PORT as unknown) as number;

const app = new App({
  port,
  controllers: [new HomeController()],
  middleWares: [
    bodyParser.json({ limit: '50mb' }),
    bodyParser.urlencoded({ limit: '50mb', extended: true }),
    loggerMiddleware,
    cors(),
  ],
});

app.listen();
