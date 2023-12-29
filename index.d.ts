declare namespace Express {
    // Inject additional properties on express.Request
    interface Request {
        session?: {
            data: {
                user: Partial<UserData & { _id: ObjectId }>;
                authunticated?: boolean;
            };
            id: string;
        };
    }
}

declare interface UserData {
    nickname: string;
    email: string;
    code?: string;
    codeExpireTime?: Date;
}

declare type SocketData = {
    session: SessionObj;
    cookies: {
        connection?: string;
    }
}