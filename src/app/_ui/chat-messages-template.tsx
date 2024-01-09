'use client';
import ChatMessage from "./chat-message";
import socket from "../_api/socket-connection";
import useMessages from "@/app/_hooks/use-messages";
import { useEffect, useRef } from "react";

export default function ChatMessagesTemplate({ roomname, userData }: { roomname: string, userData: Partial<UserData> }) {
    const [messages, setMessages, isPending, setIsPending] = useMessages(roomname);
    const messagesContainer = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const scrollButtom = () => {
        window.scrollTo({
            left: 0,
            top: messagesContainer.current ? messagesContainer.current.scrollHeight : 0
        });

        resizeTo(100, 100)
    }

    useEffect(() => {
        scrollButtom()
    }, [messages]);

    return (
        <div className="w-full flex flex-col bg-gray-100 grow">
            <div className="grow flex flex-col h-full scroll-p-1" ref={messagesContainer}>
                {
                    messages.length ?
                        messages.map((m) => <ChatMessage message={m.body} publisher={m.sender} isCurrentUser={m.sender.nickname === userData.nickname} key={m._id} />) :
                        isPending ? "" :
                            <div className="absolute top-[50%] left-[50%] font-semibold text-lg text-emerald-700 animate-pulse">
                                <p>This chat room has not messages yet!</p>
                            </div>
                }
            </div>

            <div className="pl-5 pr-5 box-border sticky bottom-0 mt-2">
                <form className="flex justify-between gap-3 mb-3" action={(formData) => {
                    if (inputRef.current) {
                        if (!inputRef.current.value) return;
                        inputRef.current.value = "";
                    }

                    const message = formData.get("message");
                    socket.emit("message", roomname, message);
                }}>
                    <textarea name="message" className="bg-slate-200 w-full resize-none rounded-xl box-border p-4" placeholder="write message" ref={inputRef} />
                    <input type="submit" value={"send message"} className={"bg-gray-400 pl-2 pr-2 max-h-fit box-border cursor-pointer rounded-xl"} />
                </form>
            </div>
        </div>
    )
}