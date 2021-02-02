import express, { request } from 'express';
import { CrudService } from '../common/CrudService';
import { TaskService } from './TaskServices';

export class TaskController {
    private router: express.Router;
    private service: CrudService<any, any>;
    constructor(){
        this.router = express.Router();
        this.service = new TaskService();
    }

    private regist(request: express.Request, response: express.Response){
        response.send(this.service.create());
        response.send(request.url);
    }
    private update(request: express.Request, response: express.Response){
        this.service.update();
        response.send(request.url);
    }
    private list(request: express.Request, response: express.Response){
        this.service.list();
        response.send(request.url);
    }
    private find(request: express.Request, response: express.Response){
        this.service.find();
        response.send(request.url);
    }
    private delete(request: express.Request, response: express.Response){
        this.service.delete();
        response.send(request.url);
    }

    public route(app: express.Express){
        this.router.get('/regist', (req, res)=>this.regist(req, res));
        this.router.get('/update', (req, res)=>this.update(req, res));
        this.router.get('/list', (req, res)=>this.list(req, res));
        this.router.get('/find', (req, res)=>this.find(req, res));
        this.router.get('/delete', (req, res)=>this.delete(req, res));
        return app.use("/task", this.router);
    }
}