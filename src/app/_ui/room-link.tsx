'use client';
import Link from "next/link";
import { usePathname } from "next/navigation"
import { Suspense, useState } from "react";
import Modal from "./modal";
import RoomOptions from "./room-options";
export default function RoomLink({ roomName, isAdmin }: { roomName: string, isAdmin?: boolean }) {
    const pathname = usePathname();
    const classname = pathname == `/chat/${roomName}` ? "bg-slate-300 font-semibold" : "";
    const [isOptionsActive, setIsOptionsActive] = useState(false);
    return (
        <div className={`${classname} flex justify-between pr-2 pl-2 gap-2`}>
            <Link href={`/chat/${roomName}`} className={`grow`}>
                <h1>{roomName}</h1>
                {/* <h1 className="text-2xl font-bold">&#8250;</h1> */}
            </Link>

            {
                isAdmin &&
                <p className="font-semibold text-lg flex items-center cursor-pointer" onClick={() => setIsOptionsActive(true)}>&#8230;</p>
            }

            {
                isOptionsActive && (
                    <Modal onOut={() => isOptionsActive ? setIsOptionsActive(false) : ""}>
                        {/* <Suspense fallback={<h1>Loading ....</h1>}> */}
                        {/* <button className="w-1/2 bg-red-700 text-white font-bold rounded-lg pt-1 pb-1 cursor-pointer">Leave Room</button> */}
                        <RoomOptions roomname={roomName} />
                        {/* </Suspense> */}
                    </Modal>
                )
            }
        </div>
    )

}