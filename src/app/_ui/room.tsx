'use client';
import { RoomData } from "@/models/connection";
import resolveApiUrl from "@/utils/resolve-api-url";
import { useEffect, useState } from "react";
import isMeMember from "../_actions/is-me-member";
import { useRouter } from "next/navigation";
import Modal from "./modal";
import Link from "next/link";
export default function RoomComponent({ room }: { room: RoomData & { locked?: boolean } }) {
    const [joined, setJoined] = useState<boolean | undefined>(undefined);
    const [password, setPassword] = useState("");
    const [passwordInput, setPasswordInput] = useState(false);
    const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        isMeMember(room.roomname).then(setJoined);
    }, []);

    const onJoin = () => {

        if (room.locked && !password) {
            setPasswordInput(true);
        }
        else {
            fetch(resolveApiUrl(`/rooms/join/${room.roomname}?password=${password}`), { cache: "no-store", method: "POST" }).then((r) => {
                if (r.ok) {
                    setJoined(true);
                    setPassword("");
                    setPasswordInput(false);
                    return;
                }

                switch (r.status) {
                    case 401:
                        router.push("/login");
                        break;
                    case 403:
                        setIsIncorrectPassword(true);
                        break;
                }
            });
        }
    }
    if (typeof joined === "undefined") return <div className="bg-slate-200 p-2 animate-bounce"></div>;

    return (
        <div className="bg-slate-200 p-2 rounded-md flex justify-between">
            {
                passwordInput ?
                    <Modal onOut={() => {
                        setPasswordInput(false);
                        setPassword("");
                        setIsIncorrectPassword(false);
                    }}>
                        <div className="flex flex-col p-6 shadow-lg w-1/2 bg-white gap-3">
                            {isIncorrectPassword && <p className="text-red-600 animate-bounce">Incorrect room password</p>}
                            <input placeholder="room password" onChange={(data) => {
                                setPassword(data.target.value);
                                setIsIncorrectPassword(false);
                            }} defaultChecked className="p-3 bg-gray-500 outline-none shadow-md placeholder:text-white placeholder:font-semibold caret-white text-white" />
                            <button className="bg-blue-700 font-semibold text-white p-2" onClick={onJoin}>Confirm Password</button>
                        </div>
                    </Modal>
                    : ""
            }
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
                    joined ? <Link className="bg-blue-800 pl-3 pr-3 pt-2 pb-2 text-white rounded-lg animate-pulse" href={"/chat/" + room.roomname}>chat</Link>
                        : <button type={"button"} className="bg-blue-800 pl-3 pr-3 pt-2 pb-2 text-white rounded-lg" onClick={onJoin}>join</button>
                }
            </div>
        </div>
    )
} 