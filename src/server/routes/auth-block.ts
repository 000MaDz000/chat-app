import { Router } from "express";

const authBlock = Router();

authBlock.use((req, res, next) => {
    if (!req.session?.data.authunticated) {
        res.sendStatus(401);
    }
    else {
        next();
    }
});

export default authBlock;