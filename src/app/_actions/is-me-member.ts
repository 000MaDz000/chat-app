'use server';

import { Room } from "@/models/room";
import session, { DefaultSessionData } from "@/utils/session";
import { ObjectId } from "mongodb";

export default async function isMeMember(roomname: string, checkIsAdmin?: boolean) {
    try {

        const sess = session<DefaultSessionData>({ setCookie: false });
        if (!sess.data?.authunticated) return false;
        const userId = new ObjectId(sess.data?.user._id) as ObjectId;
        const roomAccess = new Room(roomname);
        return checkIsAdmin ? roomAccess.isUserAdmin(userId) : await roomAccess.isUserMember(userId);
    }
    catch (err) {
        console.log("error", err);

        return false;
    }
}