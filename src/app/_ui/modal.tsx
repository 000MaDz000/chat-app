'use client';
import { PropsWithChildren } from "react";
export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="fixed flex items-center justify-center h-screen w-full bg-gray-100 bg-opacity-20 z-50 top-0 left-0">
            <div className="w-1/2 bg-red-500">
                {children}
            </div>
        </div>
    )
}