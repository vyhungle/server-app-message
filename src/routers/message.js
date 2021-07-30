import express from "express";
const router = express.Router();

import verifyToken from "../middleware/auth";
import Message from "../models/Message";

// @route POST api/message/:id/send-message
// @desc send message
// @access Private
router.post("/:id/send-message", verifyToken, async (req, res) => {
  try {
    const { body } = req.body;
    const message = await Message.findOne({ roomId: req.params.id });
    const content = {
      body,
      user: req.userId,
      createdAt: new Date().toISOString(),
    };

    if (message) {
      message.messages.unshift(content);
      message.save();
      return res.status(201).json({
        access: true,
        message: "send message",
        sendContent: content,
      });
    }
    return res.status(404).json({
      access: false,
      message: "send message",
      error: "Không tìm thấy phòng này, vui lòng thử lại!",
    });
  } catch (error) {
    return res.status(500).json({
      access: false,
      message: "create message",
      error: "Server error!",
    });
  }
});

// @route GET api/message/:id
// @desc get message
// @access Private
router.get("/:id", async (req, res) => {
  try {
    const response = await Message.findOne({ roomId: req.params.id },"messages");
    if (response) {
      return res.status(200).json({
        success: true,
        message: "get message by id",
        response,
      });
    }
    return res.status(404).json({
      success: false,
      message: "get message by id",
      error: "Không tìm thấy phòng này, vui lòng thử lại.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "get room by id",
      error: "Server error!",
    });
  }
});
module.exports = router;
