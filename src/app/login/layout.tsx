import { Metadata } from "next"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"min"}>
            {children}
        </div>
    )
}

export const metadata: Metadata = {
    description: "madz chat app login page",
}