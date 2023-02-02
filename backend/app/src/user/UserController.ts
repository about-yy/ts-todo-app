import { NextFunction, Request, Response } from "express";
import Logger from "../common/Logger";
import UserService from "./UserService";

export default class UserController {
    constructor(){}

    async regist(req: Request, response: Response, next: NextFunction){
        const userService = new UserService();
        const registedUser = await userService.regist(req.body.email, req.body.username, req.body.password);
        return response.send({userId: registedUser.userId});
    }
}