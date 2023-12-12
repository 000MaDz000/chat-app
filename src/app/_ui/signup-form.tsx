export default function SignupForm() {
    return (
        <form className={"flex flex-col gap-4 shadow-lg p-3 w-1/3 min-w-max"}>
            <h1 className="font-bold text-green-500 text-xl">create an account</h1>
            <input type="text" name="firstname" placeholder="firstname" title="firstname" className={"bg-slate-50 p-2 outline-none focus:bg-slate-100 transition-colors"} />
            <input type="text" name="lastname" placeholder="lastname" title="lastname" className={"bg-slate-50 p-2 outline-none focus:bg-slate-100 transition-colors"} />
            <input type="text" name="nickname" placeholder="nickname" title="nickname" className={"bg-slate-50 p-2 outline-none focus:bg-slate-100 transition-colors"} />
            <input type="email" name="email" placeholder="email address" title="email address" className={"bg-slate-50 p-2 outline-none focus:bg-slate-100 transition-colors"} />
            <input type="password" name="password" placeholder="password" title="password" className={"bg-slate-50 p-2 outline-none focus:bg-slate-100 transition-colors"} />
            <input type="submit" value={"create"} className={"w-1/3 m-auto outline-none bg-blue-700 text-white font-bold cursor-pointer rounded-md pt-2 pb-2"} title="submit information" />
        </form>
    )
}