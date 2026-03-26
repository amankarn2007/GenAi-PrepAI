import type { Request, Response } from "express";
import prismaClient from "../config/db.js";
import { loginSchema, registerSchema } from "../utils/types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

interface JwtPayload {
    id: string,
    jti: string
}

export const registerUser = async (req: Request, res: Response) => {
    const parsedResult = registerSchema.safeParse(req.body);

    if(!parsedResult.success) {
        return res.status(400).json({
            message: "Something is missing",
            error: parsedResult.error
        })
    }

    try {
        const { username, email, password } = parsedResult.data;

        const isAlreadyExists = await prismaClient.user.findUnique({
            where: {
                email
            }
        })

        if(isAlreadyExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prismaClient.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        /*-----Otp verification part-----*/
        /*-----Otp verification part-----*/

        //this func will create both token, and set both in cookies
        await generateToken(user.id, res);

        res.status(201).json({
            message: "User created successfully",
            user: {
                username: user.username,
                email: user.email,
                verified: user.verified
            }
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const parsedResult = loginSchema.safeParse(req.body);

    if(!parsedResult.success) {
        return res.status(400).json({
            message: "Something is missing",
            error: parsedResult.error
        })
    }

    try {
        const { email, password } = parsedResult.data;

        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }

        const result = await bcrypt.compare(password, user.password);
        if(!result) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }

        //this func will create both token,  and set both in cookies
        await generateToken(user.id, res);

        // send accessToken in res
        res.status(200).json({
            message: "User loged in successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getMe = async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) {
        return res.status(401).json({
            message: "Access Token is missing"
        })
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                id: (req as any).user.id, //through auth midd
            }
        })

        res.status(200).json({
            message: "User finded successfully",
            user: {
                username: user?.username,
                email: user?.email,
                verified: user?.verified
            }
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}

// verify cookie token, check refreshToken(!blacklist), rotate both tokens.
export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.cookies.accessToken;

    if(!refreshToken || !accessToken) {
        return res.status(401).json({
            message: "Token is missing"
        })
    }

    try {
        //check in refreshToken blacklist
        const decodeRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET!) as JwtPayload;
        const decodeAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;

        //check is Token blacklist
        const isRefreshTokenBlacklisted = await prismaClient.blacklist.findUnique({
            where: {
                jti: decodeRefreshToken.jti
            }
        })

        const isAccessTokenBlacklisted = await prismaClient.blacklist.findUnique({
            where: {
                jti: decodeAccessToken.jti
            }
        })

        //if blacklisted, then return
        if(isRefreshTokenBlacklisted || isAccessTokenBlacklisted) {
            return res.status(400).json({
                message: "RefreshToken is blacklisted, can't refresh the token"
            })
        }

        //now both tokens are valid, we can make token rotation now
        //blacklist both old tokens and generate new
        await Promise.all ([
            prismaClient.blacklist.create({ data: { jti: decodeRefreshToken.jti }}),

            prismaClient.blacklist.create({ data: { jti: decodeAccessToken.jti }})
        ])

        generateToken(decodeRefreshToken.id, res);

        res.status(200).json({
            message: "Token refreshed successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.cookies.accessToken;

    if(!refreshToken || !accessToken) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    try {
        const decodeRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET!) as JwtPayload;
        const decodeAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;

        //blacklist both tokens
        await prismaClient.blacklist.create({
            data: {
                jti: decodeRefreshToken.jti
            }
        })

        await prismaClient.blacklist.create({
            data: {
                jti: decodeAccessToken.jti
            }
        })

        //clear both tokens from cookies
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");

        res.status(200).json({
            message: "Successfully logged out"
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
        })
    }

}

export const verifyEmail = async (req: Request, res: Response) => {
    res.send("work is under progress")
}