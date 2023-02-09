import express, { NextFunction, Request, Response } from "express";
import AuthController from "../auth/AuthController";
import UserController from "../user/UserController";
import 'express-async-errors';
import ErrorHandler from "./ErrorHandler";
import { HttpsError } from "../common/http-error";
import config from "./config";
import Authenticator from "../common/Authenticater";
export default class App {
    private _express: express.Express;
    constructor(express: express.Express){
        this._express = express;
    }
    run(){
        this._express.listen(config.port, ()=>{
            console.log("Start on port "+config.port);
        });
        
        const authenticator = new Authenticator();

        this._express.use(express.json());
        this._express.use(express.urlencoded({extended: true}));
        this._express.post("/auth/login", new AuthController().login );
        this._express.post("/auth/logout", new AuthController().logout );
        this._express.get("/auth/isLogined", authenticator.authenticate, new AuthController().isLogined );
        this._express.post("/user/regist", new UserController().regist)
        this._express.get("/error", async (req: Request, res: Response, next: NextFunction)=>{
            throw new HttpsError("internal", "this is error test page");
        })

        this._express.use(new ErrorHandler().handleError);

    }
}