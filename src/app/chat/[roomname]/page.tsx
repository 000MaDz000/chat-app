import { redirect } from "next/navigation"
import ChatMessagesTemplate from "../../_ui/chat-messages-template";
import session, { DefaultSessionData } from "@/utils/session";

export default async function RoomPage({ params: { roomname } }: { params: { roomname: string } }) {
    const sess = session<DefaultSessionData>();
    if (!sess.data?.authunticated) redirect("/login");

    const userData = sess.data.user;
    delete userData.code;
    delete userData.codeExpireTime;
    delete userData.email;

    return (
        <div className="flex flex-col w-full">

            {/* <h1 className="font-bold text-lg p-2">{roomname}</h1> */}
            <ChatMessagesTemplate roomname={roomname} userData={userData} />
        </div>
    )
}