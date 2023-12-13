import { useParams } from "next/navigation"
import ChatMessagesTemplate from "../../_ui/chat-messages-template";

export default function RoomPage({ params: { roomname } }: { params: { roomname: string } }) {
    console.log(roomname);

    return (
        <div className="flex flex-col w-full">
            {/* <h1 className="font-bold text-lg p-2">{roomname}</h1> */}
            <ChatMessagesTemplate />
        </div>
    )
}