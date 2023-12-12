import RoomLink from "./room-link";

export default function RoomsSideBar() {
    return (
        <div className={"bg-gray-50 p-5 flex flex-col gap-3 w-1/5 shadow-md min-w-max sticky top-0 max-h-screen"}>
            <div className="">
                <h1 className="text-xl font-bold">LOGO</h1>
            </div>
            <hr />
            <p></p>

            <div className="text-white p-2 flex justify-between items-center bg-lime-600 font-bold cursor-pointer rounded-xl">
                <p>create</p>
                <p className="text-3xl">+</p>
            </div>

            <div className="rooms-links">
                <RoomLink roomName="rom1" />
            </div>
        </div>
    )
}