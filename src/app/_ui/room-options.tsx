'use client';
import { useEffect, useState } from "react";
import getRoomUsers from "../_actions/get-room-users"
import RoomUserOption from "./room-user-option";

export default function ({ roomname }: { roomname: string }) {
    const [users, setUsers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        getRoomUsers(roomname).then((users) => {
            setUsers(users);
            setIsLoading(false);
        });

    }, []);

    console.log(users);


    return (
        isLoading ? <h1>Loading</h1> :
            <div className="grid grid-cols-2 gap-3 m-20 p-5 w-full bg-red-100">
                <div className="bg-green-100 flex gap-4 flex-col p-4">
                    <h1 className={"text-md font-semibold"}>room users</h1>

                    <div className="flex flex-col gap-1 font-extralight">
                        {
                            users.map(u => <RoomUserOption user={{ nickname: u }} roomname={roomname} />)
                        }
                    </div>
                </div>

                <div className="bg-blue-100">

                </div>
            </div>
    )
}