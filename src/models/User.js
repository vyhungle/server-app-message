import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
  profile: {
    fullName: String,
    avatar: String,
    dateOfBirth: String,
    hobby: String,
    male: Boolean,
    imageCover: String,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

module.exports = model("users", userSchema);
