import express from "express";
import userRouter from "./user.js";
import cardsRouter from "./cards.js";

const router = express.Router();

router.use(userRouter);
router.use(cardsRouter);
router.use("*", (req, res) => {
  res.status(404).send({ message: "Ошбика 404. Сраница не найдена" });
});
export default router;
