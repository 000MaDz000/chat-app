import { users } from "./connection";
import { ObjectId, WithId } from "mongodb";
import sendMail from "../utils/send-mail";

const allowedCharacters = "a1b0c2d3e4f5g6h7i8j9kmnopqrstuvwxyz"
export default class User {
    static async getUserObjectWithId(id: ObjectId) {
        return await users.findOne({ _id: id });
    }

    static async getUserObjectWithNickname(nickname: string) {
        return await users.findOne({ nickname });
    }

    constructor(public email: string) {
        this.build();
    }

    async getUserObject() {
        return await users.findOne({ email: this.email });
    }

    private async build() {
        const userObject = await this.getUserObject();
        if (userObject && userObject.nickname) return;

        const emailName = this.email.slice(0, this.email.indexOf("@"));
        await this.setNickname(emailName);
    }

    async setNickname(nickname: string) {
        const isNicknameUsed = await users.findOne({ nickname });
        if (isNicknameUsed) {
            return "the nickname is used";
        }

        await users.updateOne({
            email: this.email,
        }, {
            $set: {
                nickname,
            }
        }, { upsert: true });
    }

    async generateCode() {
        let code = "";
        let codeExpireTime = new Date(Date.now() + 1000 * 60 * 60 * 2);
        for (let i = 0; i < 8; i++) {
            code += allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)];
        }

        await users.updateOne({
            email: this.email,
        }, {
            $set: {
                code,
                codeExpireTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
            }
        }, { upsert: true });

        return {
            code,
            codeExpireTime,
        };
    }

    async getCode() {
        const user = await users.findOne({ email: this.email }) as WithId<UserData>;
        const expireTime = user?.codeExpireTime as Date;

        if (!user || expireTime.getTime() - Date.now() <= 0) {
            return await this.generateCode();
        }

        return {
            code: user.code as string,
            codeExpireTime: user.codeExpireTime as Date,
        }
    }

    async sendCode() {
        const { code } = await this.getCode();
        await sendMail(this.email, {
            html: `<h1>hello, your verification code is ${code}</h1>`,
            subject: "MaDz Chat Verification Code",
        });
        return true;
    }

}

// new User("noname8080noname@gmail.com").sendCode().then((x) => console.log(x, "sended"));
console.log(new Date("2023-12-21T22:16:18.888Z").getTime() - new Date().getTime());