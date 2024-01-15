'use server';

import { Room } from "@/models/room";
import session, { DefaultSessionData } from "@/utils/session";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export default async function LeaveRoom(roomname: string) {
    try {
        const sess = session<DefaultSessionData>({ setCookie: false });
        if (!sess.data?.authunticated) return false;
        const id = new ObjectId(sess.data.user._id) as ObjectId;
        const roomAccess = new Room(roomname);
        const result = await roomAccess.deleteUser(id);
        revalidatePath("/chat/*");
        return result;
    }
    catch (err) {
        return false;
    }
}