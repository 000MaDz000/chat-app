'use client';
import { RoomData } from "@/models/connection";
import resolveApiUrl from "@/utils/resolve-api-url";
import { useEffect, useState } from "react";
import isMeMember from "../_actions/is-me-member";
export default function RoomComponent({ room }: { room: RoomData & { locked?: boolean } }) {
    const [joined, setJoined] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        isMeMember(room.roomname).then(setJoined);
    }, []);

    const onJoin = () => {
        if (room.locked) {

        }
        else {
            fetch(resolveApiUrl(`/rooms/join/${room.roomname}`), { cache: "no-store", method: "POST" }).then((r) => {
                console.log(r);
                setJoined(true);
            });
        }
    }
    if (typeof joined === "undefined") return <div className="bg-slate-200 p-2 animate-bounce"></div>;

    return (
        <div className="bg-slate-200 p-2 rounded-md flex justify-between">
            <div className="flex flex-col">
                <div className="">
                    <h1>{room.roomname}</h1>
                </div>

                <div>
                    <h1 className="text-sm">{room.creationDate.toDateString()}</h1>
                </div>
            </div>

            <div className="flex items-center">
                {
                    joined ? <p className="text-red-600">&#10004;</p>
                        : <button type={"button"} className="bg-blue-800 pl-3 pr-3 pt-2 pb-2 text-white rounded-lg" onClick={onJoin}>join</button>
                }
            </div>
        </div>
    )
} 