'use client';
import ChatMessage from "./chat-message";
import socket from "../_api/socket-connection";
import useMessages from "@/app/_hooks/use-messages";

// socket.emit("message", "foo", "it's a new message here ");
// socket.on("message", console.log);
export default function ChatMessagesTemplate({ roomname, userData }: { roomname: string, userData: Partial<UserData> }) {
    const [messages, setMessages] = useMessages(roomname);


    return (
        <div className="w-full flex flex-col bg-gray-100 grow">
            <div className="grow flex flex-col h-full scroll-p-1">
                {messages.map((m) => <ChatMessage message={m.body} publisher={m.sender} isCurrentUser={m.sender.nickname === userData.nickname} key={m._id} />)}
            </div>

            <div className="pl-5 pr-5 box-border sticky bottom-0 mt-2">
                <form className="flex justify-between gap-3 mb-3" action={(formData) => {
                    const message = formData.get("message");
                    socket.emit("message", roomname, message);
                }}>
                    <textarea name="message" className="bg-slate-200 w-full resize-none rounded-xl box-border p-4" placeholder="write message" />
                    <input type="submit" value={"send message"} className={"bg-gray-400 pl-2 pr-2 max-h-fit box-border cursor-pointer rounded-xl"} />
                </form>
            </div>
        </div>
    )
}