type Publisher = {
    name: string;
}

export default function ChatMessage({ message, publisher, isCurrentUser }: { isCurrentUser?: boolean, message: string, publisher: Publisher }) {
    const dir = isCurrentUser ? "ltr" : "rtl";
    const bg = isCurrentUser ? "bg-green-200" : "bg-white bg-opacity-500";
    return (
        <div className={"flex flex-col m-3 mb-0 rounded-md gap-1"} dir={dir}>
            <div className={`max-w-fit p-3 ${bg} font-semibold`}>

                <div className="max-w-fit p-1 flex gap-1" dir="ltr">
                    <img alt="" />
                    <p>{publisher.name}</p>
                </div>

                <div className="max-w-fit" dir="ltr">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}