import {Request, Response, NextFunction} from "express";
import AuthService from "./AuthService";
import User from "../user/User";
import jwt from "jsonwebtoken";
import config from "../app/config";

export default class AuthController {
    constructor(){}
    
    async login(req: Request, response: Response, next: NextFunction){
        const authService = new AuthService();
        const user: User =  await authService.login(req.body.email, req.body.password);
        const loginReseult = typeof user.userId != undefined;
        const jwtPayload = {
            userId: user.userId,
            username: user.userName
        };
        const token = jwt.sign(jwtPayload, config.SECRET_KEY, {expiresIn: config.EXPIRES_IN});
        return response.send({result: loginReseult, userId: user.userId, email: user.email, username: user.userName, token: token});
    }

    async logout(req: Request, response: Response, next: NextFunction){
        // nothing to do 
        return response.send({result: true});
    }

    async isLogined(req: Request, response: Response, next: NextFunction){
        const service = new AuthService();
        const result = await service.isLogined(req.headers.authorization);

        return response.send({result: true});
    }
}