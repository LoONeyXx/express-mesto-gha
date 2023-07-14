import Card from "../models/card.js";

import getResponse from "../utils/utils.js";

function getCards(req, res) {
  async function request() {
    const cards = await Card.find({});
    return { data: cards };
  }
  getResponse(res, request);
}

function addCard(req, res) {
  async function request() {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    return { data: newCard, status: 201 };
  }
  getResponse(res, request);
}

function deleteCard(req, res) {
  async function request() {
    const card = req.params.cardId;
    const data = await Card.deleteOne({ _id: card }).orFail();
    return { data };
  }
  getResponse(res, request);
}

function addLike(req, res) {
  async function request() {
    const userId = req.user._id;
    const id = req.params.cardId;
    const newLikes = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();
    return { data: newLikes };
  }

  getResponse(res, request);
}

function removeLike(req, res) {
  async function request() {
    const userId = req.user._id;
    const id = req.params.cardId;
    const newLikes = await Card.findByIdAndUpdate(
      id,
      {
        $pull: { likes: userId },
      },
      { new: true },
    ).orFail();
    return { data: newLikes };
  }
  getResponse(res, request);
}

export {
  getCards, addCard, deleteCard, addLike, removeLike,
};
