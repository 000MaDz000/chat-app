import socket from "@/app/_api/socket-connection";
import { FullMessageData } from "@/models/connection";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useMessages(roomname: string): [FullMessageData[], Dispatch<SetStateAction<FullMessageData[]>>, boolean, Dispatch<SetStateAction<boolean>>] {
    const [messages, setMessages] = useState<FullMessageData[]>([]);
    const [isPending, setIsPending] = useState(true);
    roomname = roomname.replaceAll("%20", " ");
    useEffect(() => {
        fetch(`/api/messages/${roomname}`).then(res => {
            console.log(res);
            return res.json();
        }).then((res) => {
            setMessages(res as FullMessageData[]);
            setIsPending(false);
        });
    }, []);

    useEffect(() => {
        const listener = (socketMessageData: FullMessageData & { roomname: string }) => {
            if (roomname !== socketMessageData.roomname) return;
            setMessages([...messages, socketMessageData]);
        };

        socket.on("message", listener);

        return () => {
            socket.off("message", listener);
        }
    });

    return [messages, setMessages, isPending, setIsPending];
}