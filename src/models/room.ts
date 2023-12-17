import { ObjectId } from "mongodb";
import { MessageData, RoomData, messages, rooms } from "./connection";
import { UserAccess } from "./user";

export class Room {
    constructor(public RoomData: Omit<RoomData, "creationDate">) { }
    async check() {
        if (!this.RoomData.roomname) throw "roomname is required";
        if (!(this.RoomData.adminId instanceof ObjectId)) throw "invalid admin id";

        const admin = await UserAccess.getUser({ _id: this.RoomData.adminId });
        if (!admin) throw "admin not found";

        const room = await rooms.findOne({ roomname: this.RoomData.roomname });
        if (room) throw "this room name is used";
    }

    async save() {
        try {
            await this.check();

            const roomData = {
                ...this.RoomData,
                creationDate: new Date(),
            };

            const { insertedId } = await rooms.insertOne(roomData);

            return {
                _id: insertedId,
                ...this.RoomData,
            }
        }
        catch (err) {
            throw err;
        }
    }
}

export class RoomAccess {
    static async getRoom(query: { _id?: ObjectId, roomname?: string }) {
        if (query._id) return await rooms.findOne({ _id: query._id });
        if (query.roomname) return await rooms.findOne({ roomname: query.roomname });
        return null;
    }

    static async searchRoom(searchString: string) {
        return await rooms.find({ roomname: new RegExp(searchString) }).limit(10).toArray();
    }

    constructor(public roomId: ObjectId) { }
    async getMessages(dayBack: number = 1) {
        try {
            if (dayBack <= 0) dayBack = 1;
            else dayBack++;
            const oneDayMilliSeconds = 1000 * 60 * 60 * 24;
            const dateStart = new Date(Date.now() - (dayBack * oneDayMilliSeconds));
            const dateStop = new Date(dateStart.getTime() + oneDayMilliSeconds);

            return await messages.find({
                roomId: this.roomId,
                creationDate: {
                    $gt: dateStart,
                    $lt: dateStop,
                }
            }).toArray();
        }
        catch (err) {
            throw err;
        }
    }

    async isValidPassword(password?: string) {
        const roomData = await rooms.findOne({ _id: this.roomId });
        if (!roomData) throw "room not found";
        if (roomData.password === password) return true;
        return false;
    }

    async sendMessage(messageData: Omit<Omit<MessageData, "roomId">, "creationDate">) {
        const roomData = await RoomAccess.getRoom({ _id: this.roomId });
        if (!roomData) throw "room not found";
        const message: MessageData = {
            ...messageData,
            creationDate: new Date(),
            roomId: this.roomId,
        }
        const { insertedId } = await messages.insertOne(message);
        return {
            _id: insertedId,
            ...messageData,
        }
    }
}

// const r = new RoomAccess(new ObjectId("657e83699f7dad7230851f77"));

// for (let i = 0; i < 100; i++) {
//     r.sendMessage({
//         "body": "this message from loop iteration number " + i + 1,
//         "senderId": new ObjectId("657e629ff5239dab44bb6815"),
//     }).then(console.log).catch(console.log);
// }

// r.getMessages(1).then(console.log).catch(console.log);