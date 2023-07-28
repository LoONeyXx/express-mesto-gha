import jwt from "jsonwebtoken";
import AuthError from "../errors/auth-error.js";

export default function auth(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError("Неудачная авторизация");
  }
  const payload = jwt.verify(token, "super-strong-secret");
  req.user = payload;
  next();
}
