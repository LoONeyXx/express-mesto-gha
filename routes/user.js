import {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);
router.post("/users", addUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateUser);

export default router;
