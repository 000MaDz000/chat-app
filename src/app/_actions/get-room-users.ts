'use server';

import { Room } from "@/models/room";
import User from "@/models/user";

export default async function getRoomUsers(roomname: string) {
    const room = new Room(roomname);
    const ids = await room.getUsersIds();
    const usersNickNames: string[] = [];

    for (const id of ids) {
        usersNickNames.push(
            (await User.getUserObjectWithId(id))?.nickname as string
        );
    }

    return usersNickNames;
}