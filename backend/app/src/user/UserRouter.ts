import { Router } from "express"
import UserController from "./UserController";

export default class UserRouter {
    router: Router;

    constructor(){
        const controller = new UserController();

        this.router = Router();
        this.router.post("/regist", controller.regist);

    }
    
}