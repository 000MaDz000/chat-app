import RoomsSideBar from "./rooms-side-bar"

export default function MainTemplate({ children, }: { children: React.ReactNode }) {
    return (
        <main className='flex relative'>
            <RoomsSideBar />
            {children}
        </main>
    )
}