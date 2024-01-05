import { Suspense } from "react";
import Rooms from "../_ui/rooms";
import SearchRooms from "../_ui/search-rooms";
import CreateRoomButton from "../_ui/create-room-button";

export default async function RoomsPage({ searchParams }: { params: object, searchParams: { search?: string } }) {
    return (
        <div className="w-full m-5 md:w-1/2 md:m-0 flex items-center justify-center flex-col shadow-md bg-slate-50 p-5 gap-3">

            <header className="w-full flex gap-2 flex-col-reverse md:flex-row">
                <SearchRooms />
                <CreateRoomButton />
            </header>

            <main className="p-3 w-full">
                <Suspense fallback={<h1>loading rooms</h1>}>
                    <Rooms searchString={searchParams.search || ""} />
                </Suspense>
            </main>
        </div>
    )
}