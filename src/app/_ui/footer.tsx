import FooterLinksItem from "./footer-links-group";

export default function Footer() {
    const linkClassName = "text-sky-500 hover:underline hover:text-blue-500 transition-colors w-fit m-auto cursor-pointer";
    return (
        <footer className="bg-gradient-to-b from-sky-900 via-slate-600 to-gray-600 text-white font-semibold p-4 pr-16 pl-16 flex flex-col gap-14">
            <div className="flex justify-between">
                <h1>@copyright 2023/12/15</h1>
                <h1>Created By MaDz</h1>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
                <FooterLinksItem titleText="contact" className="list-none m-auto">
                    <li className={linkClassName}>facebook</li>
                    <li className={linkClassName}>github</li>
                    <li className={linkClassName}>email</li>
                </FooterLinksItem>

                <FooterLinksItem titleText="links" className="list-none flex m-auto">
                    <a href="/chat" className={linkClassName}>chat page</a>
                    <a href="/login" className={linkClassName}>login page</a>
                    <a href="/signup" className={linkClassName}>signup page</a>
                </FooterLinksItem>

                <FooterLinksItem titleText="developer" className="list-none flex m-auto">
                    <h1 className={linkClassName}>MaDz</h1>
                </FooterLinksItem>
            </div>
        </footer>
    )
}