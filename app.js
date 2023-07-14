import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import router from "./routes/index.js";

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.disable("x-powered-by");
app.use((req, res, next) => {
  req.user = {
    _id: "64b11c63933c0199373677ca",
  };

  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(router);
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.listen(PORT);
