import session, { DefaultSessionData } from "@/utils/session"
import { Metadata } from "next"
import { redirect } from "next/navigation";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    const sess = session<DefaultSessionData>();

    if (sess.data?.authunticated) {
        redirect("/chat");
    }

    return (
        <div className={""}>
            {children}
        </div>
    )
}

export const metadata: Metadata = {
    description: "madz chat app login page",
}