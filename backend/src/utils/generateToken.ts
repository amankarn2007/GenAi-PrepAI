import type { Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export default async function generateToken(userId: string, res: Response) {
    const refreshToken = jwt.sign({
        id: userId,
        jti: uuidv4(), //unique id for blacklisting
    }, process.env.JWT_SECRET!, {
        expiresIn: "7d"
    })

    const accessToken = jwt.sign({
        id: userId,
        jti: uuidv4(), //unique id for blacklisting
    }, process.env.JWT_SECRET!, {
        expiresIn: "15m"
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return accessToken;
}