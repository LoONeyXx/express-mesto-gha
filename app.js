import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import router from './routes/index.js';
import errorHandler from './middlewares/error.js';
import { PORT, BASE_URL } from './utils/config.js';

const app = express();
app.use(helmet());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(router);
mongoose.connect(BASE_URL);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
