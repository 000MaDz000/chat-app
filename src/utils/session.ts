import { UserData } from "@/models/connection";
import { randomUUID } from "crypto";
import { readFileSync, rmSync, writeFileSync } from "fs";
import { WithId } from "mongodb";
import { cookies } from "next/headers";
import path from "path";




export class Session<T> {
    id: string;
    constructor(public data: T, id?: string) {
        this.id = id || randomUUID();
    }

    destroy() {
        try {
            rmSync(Session.getPath(this.id));
        }
        catch (_err) {

        }
    }

    save() {
        writeFileSync(
            Session.getPath(this.id),
            JSON.stringify(this)
        );
    }

    static get<T>(sessionId: string): Session<T> | null {
        try {
            const fileData = readFileSync(Session.getPath(sessionId));
            const data = JSON.parse(fileData.toString());
            return new Session<T>(data.data, sessionId);
        }
        catch (err) {
            return null;
        }
    }

    static getPath(sessionId: string) {
        return path.resolve(path.join("@", "../sessions", sessionId + ".json"));
    }

}


export default function session<T>() {
    const cookie = cookies();
    const sid = cookie.get("connection")?.value || "";
    const session = Session.get<T>(sid) || new Session(null);

    if (!sid) {
        cookie.set("connection", session.id, { "path": "/" });
    }

    return session;
}

export interface DefaultSessionData {
    user: Partial<WithId<UserData>>;
    authunticated?: boolean;
}