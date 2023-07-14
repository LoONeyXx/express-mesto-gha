import User from "../models/user.js";
import { getResponse } from "../utils/utils.js";
function getAllUsers(req, res) {
  async function request() {
    const users = await User.find({});
    return users;
  }
  getResponse(res, request);
}

function getUser(req, res) {
  async function request() {
    const user = await User.findById(req.params.userId).orFail();
    return user;
  }
  getResponse(res, request);
}

function addUser(req, res) {
  async function request() {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return user;
  }

  getResponse(res, request);
}

function updateUser(req, res) {
  async function request() {
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

  getResponse(res, request);
}

export { updateUser, addUser, getAllUsers, getUser };
