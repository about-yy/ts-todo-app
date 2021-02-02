import express from 'express';
import * as dotenv from 'dotenv';
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

    }


    // ルーティング設定
    private route(){
        const indexRouter = express.Router();
        indexRouter.get("/", (request: express.Request,  response: express.Response)=>{
            response.send("hello");
        });

        this.app.use(indexRouter);
    }

    // エラーハンドリング設定
    private errorHandle(){

    }

}

const server = new Server();