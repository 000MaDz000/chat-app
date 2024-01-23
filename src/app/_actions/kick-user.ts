'use server';

import { Room } from "@/models/room";
import User from "@/models/user";
import session, { DefaultSessionData } from "@/utils/session";
import { ObjectId } from "mongodb";

export default async function KickUser(roomname: string, userNickName: string) {
    const sess = session<DefaultSessionData>({ "setCookie": false });

    if (!sess.data?.authunticated) return {
        ok: false,
        message: "you didn't logged in yet!",
    };

    const room = new Room(roomname);
    const isAdmin = await room.isUserAdmin(new ObjectId(sess.data.user._id));

    if (!isAdmin) return {
        ok: false,
        message: "you are not admin",
    };

    const userObj = await User.getUserObjectWithNickname(userNickName);

    if (!userObj) return {
        ok: false,
        message: "user not found in room scope",
    };

    const userId = userObj._id;

    await room.deleteUser(userId);

    return true;
}