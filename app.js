import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import userRouter from "./routes/user.js";
import cardsRouter from "./routes/cards.js";
const { PORT = 3000 } = process.env;
import bodyParser from "body-parser";
const app = express();
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

app.listen(PORT, () => {
  console.log(`Server on AIR on ${PORT}`);
});