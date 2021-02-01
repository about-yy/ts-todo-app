import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

class Server{
    private app: express.Express ;

    constructor(){
        this.app = express();
        this.app.get("/", (request: express.Request,  response: express.Response)=>{
            response.send("hello");
        });
        this.app.listen(process.env.PORT);
    }

    // ミドルウェア設定
    private middleware(){

    }


    // ルーティング設定
    private route(){
    
    }

    // エラーハンドリング設定
    private errorHandle(){

    }

}

const server = new Server();