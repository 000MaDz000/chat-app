export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex justify-center items-center">
            {children}
        </div>
    )
}