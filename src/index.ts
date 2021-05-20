import express from 'express';
import * as dotenv from 'dotenv';
import { TaskController } from './tasks/TaskController';

dotenv.config();

class Server{
    private app: express.Express ;

    constructor(){
        this.app = express();
        this.middleware();
        this.route();
        this.errorHandle();
        this.app.listen(process.env.PORT);
    }

    // ミドルウェア設定
    private middleware(){
        this.app.set("view engine", "pug");
        this.app.set("views","src/views");
    }


    // ルーティング設定
    private route(){
        const indexRouter = express.Router();
        indexRouter.get("/", (request: express.Request,  response: express.Response)=>{
            response.send("hello");
        });
        const taskController = new TaskController();
        taskController.route(this.app);
        this.app.use(indexRouter);
        this.app.use(express.static('src/public'));

    }

    // エラーハンドリング設定
    private errorHandle(){

    }

}

const server = new Server();