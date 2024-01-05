'use client';
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function () {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const handleSearch = (text: string) => {
        router.push(pathname + "?" + "search=" + text);
    }

    return (
        <input
            onChange={(e) => handleSearch(e.target.value)}
            type={"search"}
            placeholder={"search rooms"}
            defaultValue={params.get("search") || ""}
            className={"p-2 w-full shadow-sm shadow-sky-600 bg-sky-600 text-white placeholder-white rounded-lg outline-none"} />
    )
}