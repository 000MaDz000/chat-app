import Link from "next/link";


export default function () {
    return (
        <form className={"flex flex-col gap-4 w-1/3 min-w-max bg-slate-500 p-20 rounded-lg shadow-lg"}>
            <h1 className="font-bold text-lg text-lime-400">Login To Chat</h1>
            <input name="email" type="text" className="p-3 bg-slate-300 focus:bg-slate-200 rounded-sm text-stone-900 outline-none" placeholder="email" autoFocus />
            <input name="password" type="password" className="p-3 bg-slate-300 focus:bg-slate-200 rounded-sm text-stone-900 outline-none" placeholder="password" />
            <Link href="/recover" className="underline font-semibold text-blue-800 hover:text-sky-900 transition">forgot your password?</Link>
            <Link href="/signup" className="underline font-semibold text-blue-800 hover:text-sky-900 transition">don't have account?</Link>
        </form>
    )
}