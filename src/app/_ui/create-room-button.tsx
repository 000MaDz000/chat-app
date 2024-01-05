'use client';
import { useState } from "react";
import Modal from "./modal";
import CreateRoomForm from "./create-room-form";


export default function CreateRoomButton({ className, noDefaultWidth, noStyle, text }: { className?: string; noDefaultWidth?: boolean; noStyle?: boolean; text?: string }) {
    const [createModal, setCreateModal] = useState(false);

    return (
        <>
            <button className={(noStyle ? "" : "bg-sky-800 p-3 pt-2 pb-2 text-white font-bold rounded-md ") + (!noDefaultWidth && "md:w-1/3") + (className ? ` ${className}` : "")} onClick={() => setCreateModal(true)}>
                {text || "create"}
            </button>
            {
                createModal && (
                    <Modal onOut={() => { setCreateModal(false) }} >
                        <div className="bg-white w-[68%] md:w-1/2 shadow-2xl">
                            <CreateRoomForm />
                        </div>
                    </Modal>
                )
            }
        </>
    )
}