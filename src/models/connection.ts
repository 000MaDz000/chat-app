import dotenv from "dotenv";
import { MongoClient } from "mongodb";
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
export const users = chatDb.collection<UserData>("users");