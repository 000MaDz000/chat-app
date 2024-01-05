import { Room } from "@/models/room"
import RoomComponent from "./room";
import { RoomData } from "@/models/connection";
import { WithId } from "mongodb";

export default async function Rooms({ searchString }: { searchString: string }) {

    const rooms = searchString ? await Room.autoComplete(searchString) : await Room.getRooms();

    return (
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
            {rooms.map(m => {
                return <RoomComponent room={{ roomname: m.roomname, creationDate: m.creationDate } as WithId<RoomData>} key={m._id} />
            })}
        </div>
    )
}

export const dynamic = "force-dynamic";