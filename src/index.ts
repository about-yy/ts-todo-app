import express, { NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { TaskController } from './tasks/TaskController';
import "express-async-errors";

dotenv.config();

class Server{
    private app: express.Express ;

    constructor(){
        this.app = express();
        this.middleware();
        this.route();
        this.app.listen(process.env.PORT);
    }

    // ミドルウェア設定
    private middleware(){
        this.app.set("view engine", "pug");
        this.app.set("views","src/views");
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }


    // ルーティング設定
    private route(){
        const taskController = new TaskController();
        taskController.route(this.app);
        this.app.use(this.errorHandler);
    }

    // エラーハンドリング設定
    private errorHandler(err: Error, req:express.Request, res: express.Response, next: NextFunction){
        res.status(500);
        res.send(err.message);
    }

}

const server = new Server();