import { ObjectId, WithId } from "mongodb";
import { MessageData, RoomData, messages, rooms, users } from "./connection";

type ReturnedMessageData = {
    sender: {
        nickname: string
    },
    _id: ObjectId,
    body: string,
    creationDate: Date
}
export class Room {


    static async create(data: RoomData) {
        const room = await (new Room(data.roomname)).getRoomDocument();
        if (room) return new Error("room name is used");

        const admin = await users.findOne({ _id: data.adminId });
        if (!admin) return new Error("admin not found");


        const { insertedId } = await rooms.insertOne(data);

        return {
            _id: insertedId,
            ...data,
            users: [data.adminId]
        }
    }

    static async autoComplete(searchWord: string) {
        if (!searchWord) {
            const aggregation = rooms.aggregate([
                { $limit: 25 },
                {
                    $project: {
                        _id: 1,
                        roomname: 1,
                    }
                }
            ]);
            return await aggregation.toArray();
        }

        const aggregation = rooms.aggregate([
            {
                $limit: 25,
            },
            {
                $match: {
                    roomname: new RegExp(searchWord, "i"),
                }
            },
            {
                $project: {
                    _id: 1,
                    roomname: 1,
                }
            }
        ]).toArray();

        return await aggregation;
    }

    static async getUserRooms(userId: ObjectId) {
        if (!userId) return [];
        const aggregation = rooms.aggregate<WithId<Omit<Omit<RoomData, "users">, "password">>>([
            {
                $match: {
                    users: userId,
                }
            },
            {
                $project: {
                    users: 0,
                }
            }
        ]);

        return await aggregation.toArray();
    }

    constructor(public name: string) {

    }

    async getRoomDocument() {
        const cursor = await rooms.aggregate<Omit<WithId<RoomData>, "users">>([
            {
                $match: {
                    roomname: this.name,
                },
            },
            {
                $limit: 1,
            },
            {
                $project: {
                    users: 0,
                }
            }
        ]);

        return await cursor.next()
    }

    async deleteRoom() {

    }

    async *getUsers() {

    }


    async isUserAdmin(userId: ObjectId) {
        return (await this.getRoomDocument())?.adminId.toString() === userId.toString();
    }

    async addUser(userId: ObjectId) {
        const user = await users.findOne({ _id: userId });
        if (!user) return new Error("the user not found");
        const { modifiedCount } = await rooms.updateOne({ "roomname": this.name }, {
            $addToSet: {
                users: userId,
            }
        });

        return Boolean(modifiedCount);
    }

    async deleteUser(userId: ObjectId) {
        const { modifiedCount } = await rooms.updateOne({ roomname: this.name }, {
            $pull: {
                users: userId,
            }
        });

        return Boolean(modifiedCount);
    }

    async lock(password: string) {
        const { modifiedCount } = await rooms.updateOne({ roomname: this.name }, {
            $set: {
                password: password,
            }
        });

        return Boolean(modifiedCount);
    }

    async unlock() {
        const { modifiedCount } = await rooms.updateOne({ roomname: this.name }, {
            $set: {
                password: "",
            }
        });

        return Boolean(modifiedCount);
    }

    async sendMessage(message: Omit<MessageData, "roomId">) {

        const doc = await this.getRoomDocument();
        if (!doc) return new Error("room not found");
        if (!(await this.isUserMember(message.senderId))) return new Error("the user are not member");

        const messageToDb = {
            ...message,
            roomId: doc._id,
        }

        const { insertedId } = await messages.insertOne(messageToDb);
        return {
            _id: insertedId,
            ...message,
        }
    }

    async isCorrectPassword(password: string) {
        const correctPassword = (await this.getRoomDocument())?.password;
        if (correctPassword && correctPassword !== password) return false;
        return true;
    }

    async isUserMember(userId: ObjectId) {
        const cursor = rooms.aggregate([
            {
                $limit: 1,
            },
            {
                $match: {
                    roomname: this.name,
                    users: userId,
                }
            },
            {
                $project: {
                    users: 0,
                }
            }
        ]);

        return Boolean(await cursor.next());
    }

    async getMessages(): Promise<ReturnedMessageData[]> {
        const roomId = (await this.getRoomDocument())?._id;
        if (!roomId) return [];

        const agg = messages.aggregate<ReturnedMessageData>([
            {
                $match: {
                    roomId: roomId
                }
            },
            {
                $lookup: {
                    localField: "senderId",
                    foreignField: "_id",
                    from: "users",
                    as: "sender",
                }
            },
            {
                $project: {
                    body: 1,
                    creationDate: 1,
                    sender: {
                        $arrayElemAt: ["$sender", 0],
                    }
                }
            },
            {
                $project: {
                    body: 1,
                    creationDate: 1,
                    sender: {
                        nickname: 1
                    }
                }
            }
        ]).toArray()

        return await agg;
    }
}