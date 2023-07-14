import express from "express";
import {
  getCards,
  addCard,
  deleteCard,
  addLike,
  removeLike,
} from "../controllers/cards.js";
const router = express.Router();

router.get("/cards", getCards);
router.post("/cards", addCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", addLike);
router.delete("/cards/:cardId/likes", removeLike);

export default router;
