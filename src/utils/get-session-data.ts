import { readFile } from "fs/promises";
import path from "path";
import { DefaultSessionData } from "./session";

const sessfolder = path.resolve("sessions");
export default async function getSessionData(sessionId: string): Promise<DefaultSessionData> {
    if (!sessionId) return {} as DefaultSessionData;
    const sessFile = path.join(sessfolder, sessionId) + ".json";
    const sessObject = JSON.parse((await readFile(sessFile)).toString());
    return sessObject;
}