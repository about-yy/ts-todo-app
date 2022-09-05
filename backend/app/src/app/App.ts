import express from "express";
import AuthController from "../auth/AuthController";
export default class App {
    private _express: express.Express;
    constructor(){
        this._express = express();
    }
    run(){
        this._express.listen(process.env.PORT, ()=>{
            console.log("Start on port "+process.env.PORT);
        });
        this._express.post("/auth/login", new AuthController().login );
        this._express.post("/auth/logout", new AuthController().logout );
        this._express.get("/auth/isLogined", new AuthController().isLogined );
    }
}