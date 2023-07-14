import User from "../models/user.js";
import { getResponse, sendResponse } from "../utils/utils.js";

function getAllUsers(req, res) {
  async function sendRequire() {
    const users = await User.find({});
    sendResponse(res, users, "users");
  }
  getResponse(res, sendRequire);
}

function getUser(req, res) {
  async function sendRequire() {
    const user = await User.findById(req.params.userId);
    sendResponse(res, user, "users");
  }
  getResponse(res, sendRequire);
}

function addUser(req, res) {
  async function sendRequire() {
    const { name = "", about = "", avatar = "" } = req.body;
    const user = await User.create({ name, about, avatar });
    sendResponse(res, user, "users");
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
      { returnOriginal: false }
    );
    console.log(id);
    sendResponse(res, user, "users");
  }

  getResponse(res, sendRequire);
}

export { updateUser, addUser, getAllUsers, getUser };
