import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

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

app.use(loggerMiddleware);

app.get('/hello', (request, response) => {
  response.json('Hello world!');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at port ${process.env.SERVER_PORT}`);
});
