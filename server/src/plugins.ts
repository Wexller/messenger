import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Application } from 'express';
import loggerMiddleware from './core/middleware/logger.middleware';
import errorMiddleware from './core/middleware/error.middleware';
import router from './router';

export default function (app: Application) {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    }),
  );
  app.use(loggerMiddleware);

  app.use('/api', router);

  app.use(errorMiddleware);
}
