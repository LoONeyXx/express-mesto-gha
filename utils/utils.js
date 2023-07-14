import mongoose from "mongoose";

function sendError(res, error) {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ message: "Переденны некорректные данные" });
    return;
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404).send({ message: error.query });
    return;
  }

  res.status(500).send({ message: "Что то пошло не так!" });
}

export async function getResponse(res, callback) {
  try {
    await callback();
  } catch (error) {
    sendError(res, error);
  }
}

export function sendResponse(res, data, typeFetch) {
  if (data) {
    res.status(200).send(data);
    return;
  }
  if (typeFetch === "users") {
    throw new mongoose.Error.DocumentNotFoundError(
      "Запрашиваемый пользователь не найден"
    );
  }
  if (typeFetch === "cards") {
    throw new mongoose.Error.DocumentNotFoundError(
      "Запрашиваемая карточка не найдена"
    );
  }
}
