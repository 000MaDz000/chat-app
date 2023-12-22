'use server';
import { UserData } from "@/models/connection";
import User from "@/models/user";
import session, { DefaultSessionData } from "@/utils/session";
import { WithId } from "mongodb";
import { redirect } from "next/navigation";

export default async function enterCodeAction(formData: FormData) {
    const code = formData.get("code");
    const sess = session<DefaultSessionData>();
    const email = sess.data?.user?.email;

    if (!email || sess.data?.authunticated) {
        sess.destroy();
        redirect("/login");
    }



    const user = new User(email);
    const userCode = (await user.getCode()).code;
    if (code === userCode) {
        (sess.data as DefaultSessionData).authunticated = true;
        (sess.data as DefaultSessionData).user = await user.getUserObject() as WithId<UserData>;
        sess.save();
        console.log("code is true");
        redirect("/");
    } else {
        console.log(sess.data);
        console.log("code is:", code);
        console.log("expected:", userCode);

    }
}
