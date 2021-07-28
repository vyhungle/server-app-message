import { model, Schema } from "mongoose";

const roomSchema = new Schema({
  users: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      exist: {
        type: Boolean,
        default: true,
      },
    },
  ],
  group: Boolean,
  createdAt: String,
});

module.exports = model("rooms", roomSchema);
