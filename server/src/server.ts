import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import sequelize from './core/database/database';

import router from './router';

function loggerMiddleware(request: express.Request, response: express.Response, next) {
  console.log(`${request.method} ${request.path}`);
  next();
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use('/api', router);

app.use(loggerMiddleware);

app.listen(process.env.SERVER_PORT, async () => {
  await sequelize.sync();
  console.log(`Server running at port ${process.env.SERVER_PORT}`);
});
