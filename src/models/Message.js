import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
  },
  messages: [
    {
      body: String,
      user: { type: Schema.Types.ObjectId, ref: "users" },
      createdAt: String,
    },
  ],
});

module.exports = model("messages", messageSchema);
