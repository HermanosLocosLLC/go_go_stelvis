import path from 'path';
import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import apiRouter from './routes';
import { errorHandler } from './middlewares';
import { NotFoundError } from './errors';
// import { clientBaseUrl } from './utils/baseUrls';

const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: clientBaseUrl,
//   }),
// );
app.use(express.json());
app.use(cookieParser());

// ROUTE FOR SERVING FRONT END
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

// API ROUTES
app.use('/api/v1', apiRouter);

// NOT FOUND ROUTE HANDLER
app.use((_req, _res) => {
  throw new NotFoundError();
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

export { app };
