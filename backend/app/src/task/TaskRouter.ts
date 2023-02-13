import { Router } from "express";
import Authenticator from "../common/Authenticator";
import TaskController from "./TaskController";

export default class TaskRouter {
    router: Router;
    constructor(){
        const controller = new TaskController(); 
        const authenticator = new Authenticator();
        this.router = Router();
        this.router.post("/create", authenticator.authenticate, controller.create);

    }
}