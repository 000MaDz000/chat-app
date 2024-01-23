import KickUser from "../_actions/kick-user"

export default function RoomUserOption({ user, roomname }: { roomname: string, user: { nickname: string } }) {

    return (
        <div className="flex justify-between items-center">
            <h1>{user.nickname}</h1>
            <button className="p-2 bg-red-700 rounded-lg text-white font-semibold" onClick={() => {
                KickUser(roomname, user.nickname).then(console.log)
            }}>
                kick
            </button>
        </div>
    )
}