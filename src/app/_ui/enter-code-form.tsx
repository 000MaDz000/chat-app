import enterCodeAction from "../_actions/enter-code";
import ReSendCodeButton from "./resend-code-button";

export default function EnterCode() {
    return (
        <form className="bg-white p-[2%] flex flex-col gap-3 md:w-1/2 md:mx-0 w-full mx-[10%]" action={enterCodeAction}>
            <label className="text-lg float-left w-full">Code</label>
            <input className="bg-gray-300 p-2 outline-none focus:bg-gray-200 transition-colors caret-gray-600" placeholder="code" name="code" />
            <button type="submit" className="bg-blue-700 text-white font-bold p-2">Submit</button>
            <ReSendCodeButton />
        </form>
    )
}