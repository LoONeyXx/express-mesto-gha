import mongoose from "mongoose";

function sendError(res, error) {
  if (
    error instanceof mongoose.Error.ValidationError
    || error instanceof mongoose.Error.CastError
  ) {
    res.status(400).send({ message: "Переданы некорректные данные" });
    return;
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404).send({ message: "По данному запросу ничего не найдено" });
    return;
  }

  res.status(500).send({ message: "Что то пошло не так :(" });
}

export default async function getResponse(res, callback) {
  try {
    const { data, status = 200 } = await callback();
    res.status(status).send(data);
  } catch (error) {
    sendError(res, error);
  }
}
