import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model("user", userSchema);
