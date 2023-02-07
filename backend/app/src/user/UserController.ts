import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import UserRegistInput from "./UserRegistInput";
import UserService from "./UserService";
import Validator from "../common/Validator";
export default class UserController {
    constructor(){}

    async regist(req: Request, response: Response, next: NextFunction){
        const userService = new UserService();
        const validationResult = await Validator.classValidate(plainToClass(UserRegistInput, req.body));
        const registedUser = await userService.regist(req.body.email, req.body.username, req.body.password);
        return response.send({userId: registedUser.userId});
    }
}