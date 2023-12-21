import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

if (typeof process.env.MONGODB_CONNECTION !== "string") {
    console.log("mongodb connection url is required");
    process.exit(1);
}

const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION);
const chatdb = mongoClient.db("chatdb");

interface UserData {
    email: string;
    code: string;
    nickname: string;
    codeExpireTime: Date;
}

export const
    messages = chatdb.collection("messages"),
    rooms = chatdb.collection("rooms"),
    users = chatdb.collection<UserData>("users");