import express, { NextFunction, Request, Response } from "express";
import AuthController from "../auth/AuthController";
import Logger from "../common/Logger";
import UserController from "../user/UserController";
import 'express-async-errors';
import ErrorHandler from "./ErrorHandler";
import { HttpsError } from "../common/http-error";

export default class App {
    private _express: express.Express;
    constructor(express: express.Express){
        this._express = express;
    }
    run(){
        this._express.listen(process.env.PORT, ()=>{
            console.log("Start on port "+process.env.PORT);
        });

        this._express.use(express.json());
        this._express.use(express.urlencoded({extended: true}));

        this._express.post("/auth/login", new AuthController().login );
        this._express.post("/auth/logout", new AuthController().logout );
        this._express.get("/auth/isLogined", new AuthController().isLogined );
        this._express.post("/user/regist", new UserController().regist)
        this._express.get("/error", async (req: Request, res: Response, next: NextFunction)=>{
            Logger.error("hello from error");
            throw new HttpsError("internal", "this is error test page");
        })

        this._express.use(new ErrorHandler().handleError);

    }
}