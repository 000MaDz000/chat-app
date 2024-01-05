
import { redirect } from "next/navigation";
import MainTemplate from "../_ui/main-template";
import Logo from "../_ui/logo";
import Link from "next/link";
import CreateRoomButton from "../_ui/create-room-button";

export default function Home() {
    const isAuthorized = true;

    if (!isAuthorized) {
        redirect("/login");
    }

    return (
        <MainTemplate>
            <div className="flex items-center justify-center flex-col w-full bg-gray-100 font-semibold text-md md:font-bold md:text-xl">
                <Logo className="text-sky-600" />
                <h1 className="text-purple-600">Choose a chat room and start chat with others</h1>
                <div className="flex gap-6 items-center m-5">
                    <Link href="/rooms" className="text-blue-600 hover:text-blue-700 hover:underline transition-all">rooms page</Link>
                    <CreateRoomButton noDefaultWidth noStyle className="text-blue-600 hover:text-blue-700 hover:underline transition-all" text="create new room" />
                </div>
            </div>
        </MainTemplate>
    )
}
