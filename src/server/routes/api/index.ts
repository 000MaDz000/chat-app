import { Room } from "../../../models/room";
import sessionManager from "../../session-manager";
import cookieParser from "cookie-parser";
import { Router } from "express";
import messages from "./messages";
import rooms from "./rooms";

const api = Router();

api.use(cookieParser());
api.use(sessionManager);

api.use("/messages", messages);
api.use("/rooms", rooms);


export default api;