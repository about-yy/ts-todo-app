import { Router } from "express";
import Authenticator from "../common/Authenticator";
import AuthController from "./AuthController";

export default class AuthRouter {
    router: Router;
    constructor(){
        const controller = new AuthController();
        const authenticator = new Authenticator();

        this.router = Router();
        this.router.post("/login", controller.login );
        this.router.post("/logout", controller.logout );
        this.router.get("/isLogined", authenticator.authenticate, controller.isLogined );
    }
}