import {Request, Response, NextFunction} from "express";
import AuthService from "./AuthService";
import User from "../user/User";
export default class AuthController {
    constructor(){}
    
    async login(req: Request, response: Response, next: NextFunction){
        const authService = new AuthService();
        const user: User =  await authService.login(req.body.email, req.body.password);
        const loginReseult = typeof user.userId != undefined;
        return response.send({result: loginReseult, userId: user.userId, email: user.email, username: user.userName});
    }

    async logout(req: Request, response: Response, next: NextFunction){
        return response.send("logout api");
    }

    async isLogined(req: Request, response: Response, next: NextFunction){
        return response.send("isLogined api");
    }
}