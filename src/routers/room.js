import express from "express";
const router = express.Router();

import verifyToken from "../middleware/auth";
import Room from "../models/Room";
import Message from "../models/Message";
import { checkIsRoom, getIdRoom } from "../utils/validators";

// @route GET api/message/:id
// @desc get room
// @access Public
router.get("/get-room/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      return res.status(200).json({
        success: true,
        message: "get room id",
        room,
      });
    }
    return res.status(404).json({
      success: false,
      message: "get room id",
      error: "Không tìm thấy phòng này, vui lòng thử lại.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "get room id",
      error: "Server error!",
    });
  }
});

// @route GET api/message/my-room
// @desc get my rooms
// @access private
router.get("/get-my-rooms", verifyToken, async (req, res) => {
  try {
    const rooms = await Room.find().populate("users.userId", [
      "_id",
      "username",
    ]);
    const myRooms = [];
    for (const room of rooms) {
      if (checkIsRoom(req.userId, room)) {
        myRooms.push(room);
      }
    }

    return res.status(200).json({
      success: true,
      message: "get my rooms",
      rooms: myRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "get my rooms",
      error: "Server error!",
    });
  }
});

// @route POST api/message/create-room
// @desc create room
// @access Private
router.post("/create-room", verifyToken, async (req, res) => {
  try {
    const { userId } = req.body;
    const users = [{ userId: req.userId }, { userId }];
    const room = await Room.find();

    if (getIdRoom(req.userId, userId, room) !== "") {
      return res.status(200).json({
        success: true,
        message: "create room",
        roomId: getIdRoom(req.userId, userId, room),
      });
    }
    const newRoom = new Room({
      users,
      group: false,
      createdAt: new Date().toISOString(),
    });
    await newRoom.save();
    const newMessage = new Message({
      roomId: newRoom._id,
    });
    await newMessage.save();
    return res.status(201).json({
      success: true,
      message: "create room",
      roomId: newRoom._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "create room",
      error: "Server error!",
    });
  }
});

module.exports = router;
