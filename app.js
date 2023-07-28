import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import { errors } from "celebrate";
import router from "./routes/index.js";
import { sendError } from "./utils/utils.js";

const { PORT = 3000, BASE_URL = "mongodb://127.0.0.1:27017/mestodb" } = process.env;

const app = express();
app.use(helmet());
app.use(cookieParser());
app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json());
app.use(router);
mongoose.connect(BASE_URL);
app.use(errors());
app.use(sendError);
app.listen(PORT);
