type Publisher = {
    name: string;
}

export default function ChatMessage({ message, publisher, isCurrentUser }: { isCurrentUser?: boolean, message: string, publisher: Publisher }) {
    const dir = isCurrentUser ? "ltr" : "rtl";
    return (
        <div className={"flex flex-col p-3 bg-opacity-500 bg-white m-3 mb-0 rounded-md gap-1"} dir={dir}>
            <div className="max-w-fit p-1 flex gap-1" dir="ltr">
                <img alt="" />
                <p>{publisher.name}</p>
            </div>

            <div className="max-w-fit" dir="ltr">
                <p>{message}</p>
            </div>
        </div>
    )
}