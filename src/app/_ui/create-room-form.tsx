import { useEffect, useState } from "react";
import createRoom from "../_actions/create-room"

export default function CreateRoomForm() {
    const [error, setError] = useState("");

    const onWriteRoomName = () => {
        setError("");
    }

    const oncreate = async (formdata: FormData) => {
        const response = await createRoom(formdata);
        if (!response.ok) setError(response.message);
    }

    return (
        <form action={oncreate} className="flex flex-col gap-3 p-4">
            {error ? <p className="text-red-600 animate-bounce">{error}</p> : ""}
            <input onChange={() => onWriteRoomName()} type="text" name="roomname" autoComplete="roomname" placeholder="room name" className="p-3 outline-none bg-slate-100 focus:bg-slate-200 rounded-sm transition-colors" />
            <input type="password" name="password" autoComplete="roompassword" placeholder="room password (optional)" className="p-3 outline-none bg-slate-100 focus:bg-slate-200 rounded-sm transition-colors" />
            <input value={"create"} type="submit" className="p-2 w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white font-bold cursor-pointer rounded-md" />
        </form>
    )
}