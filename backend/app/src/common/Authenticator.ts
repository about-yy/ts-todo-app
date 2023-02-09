import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import config from "../app/config";
import { HttpsError } from "./http-error";

export default class Authenticator {
    async authenticate(req: Request, res: Response, next: NextFunction){
        if(!req.headers.authorization){
            throw new HttpsError("unauthenticated", "no token");
        }

        try {
            // jwtの検証
            const payload: string | JwtPayload  = jwt.verify(req.headers.authorization, config.SECRET_KEY);
            if( typeof payload !== "string" ){
                delete payload.iat;
                delete payload.exp; 
            }

            // jwtの更新
            const newToken = jwt.sign(payload, config.SECRET_KEY, {expiresIn: config.EXPIRES_IN});
            res.setHeader("Authorization", newToken);
            next();
        } catch (e: any) {
            if(e instanceof JsonWebTokenError){
                throw new HttpsError("unauthenticated","invalid token", e);
            } else {
                throw e;
            }
        }
    }
}