import { NextFunction, Request, Response } from "express";

export default class UserController {
    constructor(){}

    async regist(req: Request, response: Response, next: NextFunction){
        return response.send({id: "111"});
    }
}