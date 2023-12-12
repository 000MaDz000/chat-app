
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"min"}>
            {children}
        </div>
    )
}

export const metadata = {
    name: "madz chat app login page",
}