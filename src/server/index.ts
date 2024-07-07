import next from "next";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import api from "./routes/api";
import getSessionData from "../utils/get-session-data";
import { DefaultSessionData } from "../utils/session";
import { Room } from "../models/room";
import { ObjectId } from "mongodb";
import { MessageData } from "@/models/connection";

const dev = process.env.NODE_ENV !== "production";
const port = (process.env.PORT as number | undefined) || 3000;
const nextApp = next({ dev, port, customServer: true });
const requestHandler = nextApp.getRequestHandler();

const app = express();
const server = http.createServer(app);
const socketServer = new Server<any, any, any, SocketData>(server);

app.use(cors());
app.use("/api", api);
app.use(async (req, res) => {
    requestHandler(req, res);
});

nextApp.prepare().then(() => {
    server.listen(port, () => {
        console.log("server started on http://127.0.0.1:" + port);
    });
});


socketServer.use(async (socket, next) => {
    const cookies = socket.request.headers.cookie || "";
    const splited = cookies.split(";");
    const parsed: { [key: string]: string } = {};
    splited.map((cookie, i) => {
        const [key, value] = cookie.split("=");
        parsed[key.trim()] = value;
    });

    socket.data.cookies = parsed;
    next();
});

socketServer.use(async (socket, next) => {
    const sessionData = await getSessionData(socket.data.cookies.connection || "");
    socket.data.session = sessionData;
    next();
});

socketServer.use(async (socket, next) => {
    socket.rooms.clear();
    const rooms = await Room.getUserRooms(new ObjectId(socket.data.session.data.user._id));
    rooms.forEach(val => {
        socket.join(val._id.toString());
    });
    next();
});

socketServer.on("connection", async (socket) => {
    socket.on("message", async (roomname: string, message: string) => {
        try {
            roomname = roomname.replaceAll("%20", " ");
            const room = new Room(roomname);
            const roomObj = await room.getRoomDocument();
            if (!roomObj || !socket.rooms.has(roomObj._id.toString())) return;

            const sess = socket.data.session as { id: string, data: DefaultSessionData };
            // console.log(sess)
            if (!sess.data.authunticated || !(await room.isUserMember(new ObjectId(sess.data.user._id)))) return;

            const messageData: MessageData = {
                "body": message,
                "creationDate": new Date(),
                "roomId": roomObj._id,
                "senderId": new ObjectId(socket.data.session.data.user._id),
            }

            // database
            const sendedMessage = await room.sendMessage(messageData);
            if (sendedMessage instanceof Error) return;

            // realtime
            socketServer.to(roomObj._id.toString()).emit("message", {
                _id: sendedMessage._id,
                body: messageData.body,
                creationDate: messageData.creationDate,
                sender: {
                    nickname: socket.data.session.data.user.nickname,
                },
                roomname,
            });
        }
        catch (err) {
            return;
        }

    });
});
