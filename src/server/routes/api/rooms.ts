import { Room } from "../../../models/room";
import { Request, Router } from "express";
import authBlock from "../auth-block";
import { ObjectId } from "mongodb";

const rooms = Router();

rooms.use(authBlock);

rooms.get("/my-rooms", async (req: Request, res) => {
    try {
        const userData = req.session?.data.user;
        if (!userData) return res.sendStatus(401);

        const rooms = await Room.getUserRooms(userData._id);
        console.log(rooms);

        res.json(rooms);
    }
    catch (err) {
        res.sendStatus(500);
    }
});

rooms.post("/join/:roomname?", async (req, res) => {
    try {
        const userData = req.session?.data.user;
        const roomname = req.params.roomname;
        const password = req.query.password;

        const room = new Room(roomname as string);
        const isCorrectPassword = room.isCorrectPassword(password as string)
        if (!isCorrectPassword) return res.status(403).send("incorrect password");

        const result = room.addUser(new ObjectId(userData?._id));

        if (result instanceof Error) {
            res.status(400).send(result.message);
        }
        else {
            res.sendStatus(200);
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
});

rooms.get("/send/:roomname", async (req, res) => {

});
export default rooms;