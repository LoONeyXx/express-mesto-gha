import User from "../models/user.js";

import getResponse from "../utils/utils.js";

function getAllUsers(req, res) {
  async function request() {
    const users = await User.find({});
    return { data: users };
  }
  getResponse(res, request);
}

function getUser(req, res) {
  async function request() {
    const user = await User.findById(req.params.userId).orFail();
    return { data: user };
  }
  getResponse(res, request);
}

function addUser(req, res) {
  async function request() {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return { data: user, status: 201 };
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
        $set: { name, about, avatar },
      },
      { returnOriginal: false, runValidators: true },
    ).orFail();
    return { data: user };
  }

  getResponse(res, request);
}

export {
  updateUser, addUser, getAllUsers, getUser,
};
