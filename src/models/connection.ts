import dotenv from "dotenv";
import { MongoClient, ObjectId, WithId } from "mongodb";
const mongodb = require("mongodb");

dotenv.config();
if (!process.env.MONGODB_CONNECTION) {
    console.log("mongodb connection url not provided");
    console.log("please provide MONGODB_CONNECTION variable in .env file");
    process.exit(1);
};

const client = new mongodb.MongoClient(process.env.MONGODB_CONNECTION) as MongoClient;
const chatDb = client.db("chatdb");


export interface RoomData {
    roomname: string;
    adminId: ObjectId;
    creationDate: Date;
    password?: string;
    users?: ObjectId[];
}

export interface MessageData {
    senderId: ObjectId,
    roomId: ObjectId;
    body: string;
    creationDate: Date;
}

export interface FullMessageData {
    _id: string;
    body: string;
    creationData: Date;
    sender: {
        nickname: string;
    }
}
export const users = chatDb.collection<UserData>("users");
export const rooms = chatDb.collection<RoomData>("rooms");
export const messages = chatDb.collection<MessageData>("messages");

messages.createIndex({ "roomId": 1 });

rooms.createIndex({ "roomname": 1, "users": 1 });
rooms.createIndex({ "users": 1 });
rooms.createIndex({ "roomname": 1, "adminId": 1 });
rooms.createIndex({ "adminId": 1 });

users.createIndex({ nickname: 1 });
users.createIndex({ email: 1 });

