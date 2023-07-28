import mongoose from "mongoose";
import { celebrate, Joi } from "celebrate";
import AuthError from "../errors/auth-error.js";
import { pattern } from "./config.js";

export function sendError(error, req, res, next) {
  if (error instanceof AuthError) {
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

export async function getResponse(res, callback, next) {
  try {
    const { data, status = 200 } = await callback();
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export const idCardValidator = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

export const bodyCardValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }),
});

export const userValidatorAuth = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().regex(pattern).min(8),
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
  }),
});

export const userValidatorUpdate = () => celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(pattern).min(8),
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
  }),
});

export const userIdValidator = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});
