import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

if (!process.env.MAIL_USER) {
    console.log("mail user is required, please provide it in .env file");
    process.exit(1);
}
if (!process.env.MAIL_PASS) {
    console.log("mail password not provided please provide it in .env file as MAIL_PASS");
    process.exit(1);
}


export default async function sendMail(address: string, mailOptions: MailOptions) {
    try {
        const transporter = createTransport({
            host: "smtp.office365.com",
            port: 587,
            tls: {
                ciphers: "SSLv3",
            },
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            secure: false,
        });

        return await transporter.sendMail({
            from: "madz chat app<madz000@outlook.sa>",
            to: address,
            ...mailOptions,
        });
    }
    catch (err) {
        throw err;
    }
}