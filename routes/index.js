import userRouter from "./user.js";
import cardsRouter from "./cards.js";
import express from "express";
const router = express.Router();

router.use(userRouter);
router.use(cardsRouter);
router.use("*", (req, res) => {
  res.status(404).send("Ошбика 404. Сраница не найдена");
});
export default router;
