import LoginIcon from "./login-icon";
import Logo from "./logo";
import SignupIcon from "./signup-icon";

export default function Header() {
    return (
        <div className={"p-4 flex justify-between items-center bg-gray-300"}>
            <Logo />
            <div className="flex gap-4 p-2">
                <LoginIcon />
                <SignupIcon />
            </div>
        </div>
    )
}