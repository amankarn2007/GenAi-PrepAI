import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prismaClient from "../config/db.js";


export default async function authUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) {
        return res.status(400).json({
            //message: "Token is missing"
            message: "you're not loged in"
        })
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as {id: string, jti: string};

        const isBlacklisted = await prismaClient.blacklist.findUnique({
            where: { jti: decoded.jti }
        })

        if(isBlacklisted) {
            return res.status(401).json({ message: "Token is blacklisted" })
        }

        (req as any).user = decoded;
        next();
    } catch(err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}