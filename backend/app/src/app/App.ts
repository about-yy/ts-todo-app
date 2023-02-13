import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import ErrorHandler from "./ErrorHandler";
import config from "./config";
import AuthRouter from "../auth/AuthRouter";
import UserRouter from "../user/UserRouter";
import TaskRouter from "../task/TaskRouter";

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
        this._express.use("/task", new TaskRouter().router);
    }

}