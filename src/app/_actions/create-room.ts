'use server';

import { Room } from "@/models/room";
import session, { DefaultSessionData } from "@/utils/session";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createRoom(formdata: FormData) {
    const sess = session<DefaultSessionData>();
    if (!sess.data?.authunticated) {
        redirect("/login");
    }

    const userId = new ObjectId(sess.data.user._id);
    const roomname = formdata.get("roomname")?.toString();
    if (!roomname) return {
        ok: false,
        message: "roomname is required",
    }

    const r = await Room.create({
        "adminId": userId,
        "creationDate": new Date(),
        "password": formdata.get("password")?.toString(),
        "roomname": roomname,
    });

    if (r instanceof Error) {
        return {
            ok: false,
            message: r.message,
        };
    }

    revalidatePath("/chat/*");
    revalidatePath("/rooms");
    return { ok: true }
}