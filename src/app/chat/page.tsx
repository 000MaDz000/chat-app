
import { redirect } from "next/navigation";
import MainTemplate from "../_ui/main-template";
import ChatMessagesTemplate from "../_ui/chat-messages-template";

export default function Home() {
    const isAuthorized = true;

    if (!isAuthorized) {
        redirect("/login");
    }

    return (
        <MainTemplate>
            <ChatMessagesTemplate />
        </MainTemplate>
    )
}
