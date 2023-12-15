'use client';
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
export default function Modal({ children }: PropsWithChildren) {
    const router = useRouter();
    return (
        <div className="fixed h-screen w-full bg-gray-100 bg-opacity-50 z-50 top-0 left-0">
            <h1 onClick={() => router.back()} className="absolute m-5 rounded-lg bg-red-500 text-gray-50 font-bold w-max p-1 pr-3 pl-3 text-center cursor-pointer hover:bg-red-600 hover:text-red-50 transition-colors">x</h1>
            <div className="flex justify-center items-center h-full">
                <div className="w-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}