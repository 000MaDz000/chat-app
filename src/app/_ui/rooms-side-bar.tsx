import Link from "next/link";
import RoomLink from "./room-link";
import Modal from "./modal";

export default function RoomsSideBar() {
    return (
        <div className={"bg-gray-50 p-5 flex flex-col gap-3 w-1/5 shadow-md min-w-max sticky top-0 max-h-screen"}>
            <div className="">
                <h1 className="text-xl font-bold">LOGO</h1>
            </div>
            <hr />
            <p></p>

            <Link href="/create-room" className="text-white p-2 flex justify-between items-center bg-lime-600 font-bold cursor-pointer rounded-xl">
                <p>create</p>
                <p className="text-3xl">+</p>
            </Link>

            <div className="rooms-links flex flex-col gap-2 font-serif">
                <RoomLink roomName="rom1" />
                <RoomLink roomName="rom2" />
                <RoomLink roomName="rom3" />
                <RoomLink roomName="rom4" />
                <RoomLink roomName="rom5" />
                <RoomLink roomName="rom6" />
                <RoomLink roomName="rom7" />
                <RoomLink roomName="rom8" />
                <RoomLink roomName="rom9" />
                <RoomLink roomName="rom10" />
                <RoomLink roomName="rom11" />

            </div>
        </div>
    )
}