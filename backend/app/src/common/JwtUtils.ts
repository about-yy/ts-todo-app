import { Request } from "express";
import jwt from "jsonwebtoken";
import { HttpsError } from "./http-error";

export default class JwtUtils {
    private static async getJwtFromRequest(req: Request): Promise<string>{
        if(!req.headers.authorization){
            throw new HttpsError("unauthenticated", "token not found");
        } else {
            return req.headers.authorization; 
        }
    }

    static async getUserId(req: Request): Promise<number>{
        const token = await this.getJwtFromRequest(req);
        const payload = jwt.decode(token) as jwt.JwtPayload;
        return payload.userId;
    }
}