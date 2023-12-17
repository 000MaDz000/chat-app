import { ObjectId, WithId } from "mongodb";
import { UserData, users } from "./connection";
import sendMail from "../utils/send-mail";


export class User {
    constructor(public data: UserData) { }
    async check() {
        const user = await users.findOne({ nickname: this.data.nickname });
        if (user) throw "this nickname is used";
        const userWEmail = await users.findOne({ email: this.data.email });
        if (userWEmail) throw "this email is used";
    }

    async save() {
        try {
            const check = await this.check();
            const userData = {
                email: this.data.email,
                nickname: this.data.nickname,
                code: VerificationCode.generate(8),
                codeExpireTime: new Date(Date.now() + (1000 * 60 * 60)), // one hour
            }

            sendMail(userData.email, {
                html: `<h1>hello ${userData.nickname}</h1><h1>your verification code is ${userData.code}</h1>`,
            });

            const user = await users.insertOne(userData);


            return {
                _id: user.insertedId,
                ...userData,
            }
        }
        catch (err) {
            throw err;
        }
    }
}

const availableInCode = "a1b2c3d4e5f6g7h8i9gkmnopqrstuvwxyz";

export class VerificationCode {
    static generate(length = 8) {
        let code = "";

        for (let i = 0; i < length; i++) {
            code += availableInCode[Math.floor(Math.random() * availableInCode.length)];
        }

        return code;
    }
}

export class UserAccess {
    static isCodeExpired(userData: UserData) {
        if (userData.code && userData.codeExpireTime && userData.codeExpireTime.getTime() - Date.now() > 0) return false;
        return true;
    }
    static async getUser(queryObject: { email?: string, nickname?: string, _id?: ObjectId }) {

        if (queryObject._id) {
            return await users.findOne({ _id: queryObject._id });
        }
        else if (queryObject.email) {
            return await users.findOne({ email: queryObject.email });
        }
        else if (queryObject.nickname) {
            return await users.findOne({ nickname: queryObject.email });
        }
        throw "query is required";
    }

    constructor(public userId: ObjectId) { }

    async createNewCode() {
        const code = VerificationCode.generate();
        const up = await users.updateOne({ _id: this.userId }, {
            $set: {
                code,
                codeExpireTime: new Date(Date.now() + (1000 * 60 * 60)),
            }
        });

        if (!up.modifiedCount) throw "user not found";
        return code;
    }


    async sendCode(userData?: WithId<UserData> | null) {

        if (!userData) {
            userData = await users.findOne({ _id: this.userId });
        }

        if (!userData) throw "user not found";

        let code = userData.code as string;

        if (UserAccess.isCodeExpired(userData)) {
            code = await this.createNewCode();
        }


        sendMail(userData.email, {
            html: `<h1>hello ${userData.nickname}</h1><h1>your code is ${code}</h1><h1>don't share it with anyone</h1>`,
        });
    }

    async isValidCode(code: string) {
        const user = await users.findOne({ _id: this.userId });
        if (!user) throw "user not found";

        if (UserAccess.isCodeExpired(user)) {
            this.sendCode(user);
            return false;
        }

        if (code === user.code) {
            return true;
        }

        return false;
    }

    async changeNickname(newNickName: string) {
        const user = await users.findOne({ nickname: newNickName });
        if (user) throw "this nick name is used";

        const modify = await users.updateOne({ _id: this.userId }, {
            $set: {
                nickname: newNickName
            }
        });

        return Boolean(modify.modifiedCount);
    }
}