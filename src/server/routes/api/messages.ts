import { ObjectId } from "mongodb";
import { Room } from "../../../models/room";
import { Router } from "express";

const messages = Router();

messages.get("/:roomname", async (req, res) => {
    try {
        // req.session
        const roomname = req.params.roomname;
        const room = new Room(roomname);
        const isUserMember = await room.isUserMember(new ObjectId(req.session?.data.user._id));

        if (!isUserMember) {
            res.status(403).send("you are not member");
            return;
        };

        const messages = await room.getMessages();

        res.json(messages);
    }
    catch (err) {
        res.sendStatus(500); // internal server error
    }
});

messages.post("/:roomname", async (req, res) => {

});

export default messages;