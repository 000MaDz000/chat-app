import { Metadata } from "next";

export const metadata: Metadata = {
    description: "sign up page",
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen min-w-full">
            {children}
        </div>
    )
}