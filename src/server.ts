import * as bodyParser from 'body-parser';
import App from './app';

import loggerMiddleware from './middlewares/logger';

import HomeController from './controllers/home/home.controller';

const app = new App({
  port: 5000,
  controllers: [new HomeController()],
  middleWares: [loggerMiddleware],
});

app.listen();
