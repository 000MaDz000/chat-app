import ChatMessage from "./chat-message";

export default function ChatMessagesTemplate() {
    return (
        <div className="w-full flex flex-col bg-gray-100 grow">
            <div className="grow flex flex-col h-full scroll-p-1">
                <ChatMessage publisher={{ name: "user1" }} message="hello guys!" isCurrentUser />
                <ChatMessage publisher={{ name: "user2" }} message="hello user1 how are you ?" />
                <ChatMessage publisher={{ name: "user1" }} message="i'm good wbu ?" isCurrentUser />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
                <ChatMessage publisher={{ name: "user2" }} message="i'm good, would you play pubg?" />
            </div>

            <div className="pl-5 pr-5 box-border sticky bottom-0 mt-2">
                <form className="flex justify-between gap-3 mb-3">
                    <textarea name="message" className="bg-slate-200 w-full resize-none rounded-xl box-border p-4" placeholder="write message" />
                    <input type="submit" value={"send message"} className={"bg-gray-400 pl-2 pr-2 max-h-fit box-border cursor-pointer rounded-xl"} />
                </form>
            </div>
        </div>
    )
}