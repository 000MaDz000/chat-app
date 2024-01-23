'use server';
import User from "@/models/user";
import session, { DefaultSessionData } from "@/utils/session";

export default async function reSendCode() {
    const sess = session<DefaultSessionData & { resendCodeCounter: number }>({ setCookie: true });
    if (!sess.data?.user.email || sess.data.authunticated) {
        return "invalid session data";
    }

    const email = sess.data.user.email;
    const user = new User(email);
    const resendCounts = sess.data.resendCodeCounter;
    if ((resendCounts && resendCounts < 3) || !resendCounts) {

        resendCounts ? sess.data.resendCodeCounter++ : sess.data.resendCodeCounter = 1;
        sess.save();

        if (resendCounts === 3) {
            user.generateCode();
        }

        const result = await user.sendCode();
        return result;
    }

    return "you should close your browser and open it again to continue";
}