'use server';
import User from "@/models/user";
import session from "@/utils/session";
import { redirect } from "next/navigation";

export default async function enterEmailAction(formData: FormData) {
    const email = formData.get("email")?.toString();
    if (!email) {
        console.log(email);
        return "";
    };


    const sess = session<{ user: Partial<UserData> }>({ setCookie: true });

    sess.data = {
        user: {
            email,
        }
    }

    sess.save();

    new User(email).sendCode();


    redirect("/login/code",);

}