import mongoose from "mongoose";
import AuthError from "../errors/auth-error.js";
import AccessError from "../errors/access-error.js";

export default function handleError(error, req, res, next) {
  if (error instanceof AuthError || error instanceof AccessError) {
    res.status(error.statusCode).send({ message: error.message });
    return;
  }
  if (
    error instanceof mongoose.Error.ValidationError
    || error instanceof mongoose.Error.CastError
  ) {
    res.status(400).send({
      message: Object.values(error.errors).reduce(
        (acc, curr) => `${acc} ${curr.message}`,
        "",
      ),
    });
    return;
  }
  if (error.code === 11000) {
    res.status(409).send({ message: "Такой пользователь уже существует" });
    return;
  }
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404).send({
      message: "По данному запросу ничего не найдено",
    });
    return;
  }

  res.status(500).send({ message: "Что то пошло не так :(" });
}
