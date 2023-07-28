import mongoose from "mongoose";
import validator from "validator";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Минимальная длина поля 'name' - 2"],
    maxlength: [30, "Максимальная длина поля 'name' - 30"],
    required: [true, "Поле 'name' должно быть заполнено"],
  },
  link: {
    type: String,
    required: [true, "Поле 'link' должно быть заполнено"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Некорректный URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Поле 'owner' должно быть заполнено"],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, { versionKey: false });

export default mongoose.model("card", cardSchema);
