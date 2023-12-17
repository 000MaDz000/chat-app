import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
const mongodb = require("mongodb");

dotenv.config();
if (!process.env.MONGODB_CONNECTION) {
    console.log("mongodb connection url not provided");
    console.log("please provide MONGODB_CONNECTION variable in .env file");
    process.exit(1);
};

const client = new mongodb.MongoClient(process.env.MONGODB_CONNECTION) as MongoClient;
const chatDb = client.db("chatdb");

export interface UserData {
    nickname: string;
    email: string;
    code?: string;
    codeExpireTime?: Date;
}

export interface RoomData {
    roomname: string;
    adminId: ObjectId;
    creationDate: Date;
    password?: string;
}

export interface MessageData {
    senderId: ObjectId,
    roomId: ObjectId;
    body: string;
    creationDate: Date;
}

export const users = chatDb.collection<UserData>("users");
export const rooms = chatDb.collection<RoomData>("rooms");
export const messages = chatDb.collection<MessageData>("messages");

messages.createIndex({ "roomId": 1 });

rooms.createIndex({ "roomname": 1 });
rooms.createIndex({ "adminId": 1 });

users.createIndex({ nickname: 1 });
users.createIndex({ email: 1 });

