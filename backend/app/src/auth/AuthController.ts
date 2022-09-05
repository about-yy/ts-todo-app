import {Request, Response, NextFunction} from "express";
export default class AuthController {
    constructor(){}
    
    async login(req: Request, response: Response, next: NextFunction){
        return response.send("login api");
    }

    async logout(req: Request, response: Response, next: NextFunction){
        return response.send("logout api");
    }

    async isLogined(req: Request, response: Response, next: NextFunction){
        return response.send("isLogined api");
    }
}