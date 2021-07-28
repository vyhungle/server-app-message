import express from "express";
import cors from "cors";
import http from "http";
import socketIo from "socket.io";

import { Socket } from "./socket.io";
import { ConnectionMongoDB } from "./connection";
import authRouter from "./routers/auth";
import roomRouter from "./routers/room";
import MessageRouter from "./routers/message";

require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());
app.set("json spaces", 2);

//Router
app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);
app.use("/api/message", MessageRouter);

//Socket
Socket(io);
//Connect db
ConnectionMongoDB();

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
