import User from "../models/user.js";
import { getResponse } from "../utils/utils.js";
import mongoose from "mongoose";
function getAllUsers(req, res) {
  async function sendRequire() {
    const users = await User.find({});
    return users;
  }
  getResponse(res, sendRequire);
}

function getUser(req, res) {
  async function sendRequire() {
    const user = await User.findById(req.params.userId).orFail();
    return user;
  }
  getResponse(res, sendRequire);
}

function addUser(req, res) {
  async function sendRequire() {
    const { name = "", about = "", avatar = "" } = req.body;
    const user = await User.create(
      { name, about, avatar },
      { runValidators: true }
    );
    return user;
  }

  getResponse(res, sendRequire);
}

function updateUser(req, res) {
  async function sendRequire() {
    const { name, about, avatar } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { name: name, about: about, avatar: avatar },
      },
      { returnOriginal: false, runValidators: true }
    ).orFail();
    return user;
  }

  getResponse(res, sendRequire);
}

export { updateUser, addUser, getAllUsers, getUser };
