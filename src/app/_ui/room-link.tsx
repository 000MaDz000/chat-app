'use client';
import Link from "next/link";
import { usePathname } from "next/navigation"
export default function RoomLink({ roomName }: { roomName: string }) {
    const pathname = usePathname();
    const classname = pathname == `/${roomName}` ? "bg-slate-300" : "";
    return (
        <Link href={`/${roomName}`} className={`${classname} flex justify-between items-center pr-2 pl-2`}>
            <h1>{roomName}</h1>
            {/* <h1 className="text-2xl font-bold">&#8250;</h1> */}
        </Link>
    )

}