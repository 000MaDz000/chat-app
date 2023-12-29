import getSessionData from "../utils/get-session-data";
import { Router } from "express";
import { readFile } from "fs/promises";
import path from "path";

const sessionManager = Router();

sessionManager.use(async (req, _res, next) => {
    const sessId = req.cookies.connection as string | undefined;
    if (!sessId) return;
    // adding to request object
    const sessObject = await getSessionData(sessId);
    req.session = sessObject;
    next();
});


export default sessionManager;