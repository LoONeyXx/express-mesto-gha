import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { getResponse } from "../utils/utils.js";

function getAllUsers(req, res, next) {
  async function request() {
    const users = await User.find({});
    return { data: users };
  }
  getResponse(res, request, next);
}

function getUser(req, res, next) {
  async function request() {
    const id = req.params.userId || req.user._id;
    const user = await User.findById(id).orFail();
    return { data: user };
  }
  getResponse(res, request, next);
}

function addUser(req, res, next) {
  async function request() {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      password: hash,
      email,
    });
    const userData = newUser.toObject();
    delete userData.password;
    return { data: userData, status: 201 };
  }

  getResponse(res, request, next);
}

function login(req, res, next) {
  async function require() {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, "super-strong-secret", { expiresIn: "7d" });
    res.cookie("jwt", token, {
      maxAge: 36000000,
      httpOnly: true,
    });
    return { data: { _id: user._id } };
  }
  getResponse(res, require, next);
}

function updateUser(req, res, next) {
  async function request() {
    const { name, about, avatar } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { name, about, avatar },
      },
      {
        returnOriginal: false,
        runValidators: true,
      },
    ).orFail();
    return { data: user };
  }

  getResponse(res, request, next);
}

export {
  updateUser, addUser, getAllUsers, getUser, login,
};
