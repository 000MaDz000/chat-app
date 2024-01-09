'use client';
import Link from "next/link";
import enterEmailAction from "../_actions/enter-email";


export default function () {
    return (
        <form className={"flex flex-col gap-4 w-1/2 min-w-max bg-slate-500 p-20 rounded-lg shadow-lg"} action={async (fd) => {
            const x = await enterEmailAction(fd);

        }}>
            <label className="font-bold text-lg text-lime-400">Email address</label>
            <input name="email" type="text" className="p-3 bg-slate-300 focus:bg-slate-200 rounded-sm text-stone-900 outline-none" placeholder="email" autoFocus />
            <input type="submit" className="p-3 cursor-pointer bg-sky-600 hover:bg-sky-500 rounded-sm text-stone-900 outline-none" value={"login"} />
        </form>
    )
}