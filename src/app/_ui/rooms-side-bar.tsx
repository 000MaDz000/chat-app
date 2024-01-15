import Link from "next/link";
import RoomLink from "./room-link";
import { Room } from "@/models/room";
import session, { DefaultSessionData } from "@/utils/session";
import { ObjectId } from "mongodb";
import CreateRoomButton from "./create-room-button";

export default async function RoomsSideBar() {
    const sess = session<DefaultSessionData>();
    const id = sess.data?.user._id;
    let userRooms = await Room.getUserRooms(new ObjectId(id));

    return (
        <div className={"bg-gray-50 p-5 pt-0 flex flex-col gap-3 w-1/5 shadow-md min-w-max sticky top-0 max-h-screen overflow-y-auto"}>

            <div className="sticky top-0 flex flex-col gap-3 bg-inherit pt-5 pb-5">
                <h1 className="text-xl font-bold">LOGO</h1>
                <hr />
                <CreateRoomButton className="w-full" noDefaultWidth />
            </div>


            <div className="flex flex-col gap-2">
                {
                    userRooms.map(r => {
                        return <RoomLink roomName={r.roomname} key={r._id.toString()} isAdmin={r.adminId && id && r.adminId.toString() === id.toString()} />;
                    })
                }

            </div>

        </div>
    )
}