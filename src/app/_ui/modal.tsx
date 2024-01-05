'use client';
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
export default function Modal({ children, onOut, title }: PropsWithChildren<{ onOut?: Function, title?: string }>) {
    const router = useRouter();
    return (
        <div className="fixed h-screen w-full bg-gray-100 bg-opacity-50 z-50 top-0 left-0">
            <h1 onClick={() => onOut ? onOut() : router.back()} className="absolute m-5 rounded-lg z-10 bg-red-500 text-gray-50 font-bold w-max p-1 pr-3 pl-3 text-center cursor-pointer hover:bg-red-600 hover:text-red-50 transition-colors">x</h1>
            <div className="flex justify-center items-center h-full relative">
                {title && <h1 className="absolute top-10 left-1/2 translate-x-[-50%] text-3xl text-sky-500">{title}</h1>}
                <div className="w-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}