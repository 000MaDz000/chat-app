import RoomsSideBar from "./rooms-side-bar"

export default function MainTemplate({ children, }: { children: React.ReactNode }) {
    return (
        // modified to fix the height
        <main className='flex min-h-screen'>
            <RoomsSideBar />
            {children}
        </main>
    )
}