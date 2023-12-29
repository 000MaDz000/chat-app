import { readFile } from "fs/promises";
import path from "path";
import { DefaultSessionData } from "./session";

const sessfolder = path.resolve("sessions");

export interface SessionObj {
    id: string;
    data: DefaultSessionData
}

export default async function getSessionData(sessionId: string): Promise<SessionObj> {
    if (!sessionId) return {} as SessionObj;
    const sessFile = path.join(sessfolder, sessionId) + ".json";
    const sessObject = JSON.parse((await readFile(sessFile)).toString()) as SessionObj;
    return sessObject;
}