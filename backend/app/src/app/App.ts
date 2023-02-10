import express, { NextFunction, Request, Response } from "express";
import AuthController from "../auth/AuthController";
import UserController from "../user/UserController";
import 'express-async-errors';
import ErrorHandler from "./ErrorHandler";
import { HttpsError } from "../common/http-error";
import config from "./config";
import Authenticator from "../common/Authenticator";
import AuthRouter from "../auth/AuthRouter";
import UserRouter from "../user/UserRouter";
export default class App {
    private _express: express.Express;
    constructor(express: express.Express){
        this._express = express;
    }
    run(){
        this._express.listen(config.port, ()=>{
            console.log("Start on port "+config.port);
        });

        this._express.use(express.json());
        this._express.use(express.urlencoded({extended: true}));
        this.setupRoutes();
        this._express.use(new ErrorHandler().handleError);

    }

    private setupRoutes(){
        this._express.use("/auth", new AuthRouter().router);
        this._express.use("/user", new UserRouter().router);
    }

}