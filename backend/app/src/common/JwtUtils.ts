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

    static async getUserId(token: string): Promise<number>;
    static async getUserId(req: Request): Promise<number>;
    static async getUserId(value: string | Request): Promise<number>{
        if(typeof value == "string"){
            return this.getUserIdByToken(value);
        } else {
            return this.getUserIdByRequest(value);
        }
    }

    private static async getUserIdByToken(token: string){
        const payload = jwt.decode(token) as jwt.JwtPayload;
        return payload.userId;
    }

    private static async getUserIdByRequest(req: Request){
        const token = await this.getJwtFromRequest(req);    
        const payload = jwt.decode(token) as jwt.JwtPayload;
        return payload.userId;
    }

}