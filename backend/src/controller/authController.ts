import type { Request, Response } from "express";
import prismaClient from "../config/db.js";
import { loginSchema, registerSchema } from "../utils/types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import { email } from "zod";


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

        //this func will create both token, set in cookies and return accessToken
        const accessToken = await generateToken(user.id, res);

        res.status(201).json({
            message: "User created successfully",
            user: {
                username: user.username,
                email: user.email,
                verified: user.verified
            },
            accessToken
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

        //this func will create both token, set in cookies and return accessToken
        const accessToken = await generateToken(user.id, res);

        // send accessToken in res
        res.status(200).json({
            message: "User loged in successfully",
            user: {
                username: user.username,
                email: user.email
            },
            accessToken
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getMe = async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if(!accessToken) {
        return res.status(401).json({
            message: "Access Token is missing"
        })
    }

    try {
        const decodeAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET!) as {jti: string, id: string};

        const isBlacklisted = await prismaClient.blacklist.findUnique({
            where: {
                jti: decodeAccessToken.jti
            }
        })

        if(isBlacklisted) {
            return res.status(401).json({
                message: "Token is balcklisted"
            })
        }

        const user = await prismaClient.user.findFirst({
            where: {
                id: decodeAccessToken.id
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
    
}

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.headers.authorization?.split(" ")[1];

    if(!refreshToken || !accessToken) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    try {
        //blacklist refreshToken
        const decodeRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {jti: string};
        await prismaClient.blacklist.create({
            data: {
                jti: decodeRefreshToken.jti
            }
        })

        //blacklist accessToken
        const decodeAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET!) as {jti: string};
        await prismaClient.blacklist.create({
            data: {
                jti: decodeAccessToken.jti
            }
        })

        //clear refreshToken from cookies
        res.clearCookie("refreshToken");

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