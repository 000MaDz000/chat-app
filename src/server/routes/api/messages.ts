import { Room } from "../../../models/room";
import { Router } from "express";

const messages = Router();

messages.get("/:roomname", async (req, res) => {
    try {

        const roomname = req.params.roomname;
        const messages = await new Room(roomname).getMessages();

        res.json(messages);
    }
    catch (err) {
        res.sendStatus(500); // internal server error
    }
});

messages.post("/:roomname", async (req, res) => {

});

export default messages;