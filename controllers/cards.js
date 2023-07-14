import Card from "../models/card.js";
import { getResponse, sendResponse } from "../utils/utils.js";
function getCards(req, res) {
  async function request() {
    const cards = await Card.find({});
    sendResponse(res, cards, "cards");
  }
  getResponse(res, request);
}

function addCard(req, res) {
  async function request() {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    sendResponse(res, newCard, "cards");
  }
  getResponse(res, request);
}

function deleteCard(req, res) {
  async function request() {
    const card = req.params.cardId;
    const data = await Card.deleteOne({ _id: card });
    sendResponse(res, data, "cards");
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
      { new: true }
    );

    sendResponse(res, newLikes, "cards");
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
      { new: true }
    );
    sendResponse(res, newLikes, "cards");
  }
  getResponse(res, request);
}

export { getCards, addCard, deleteCard, addLike, removeLike };
