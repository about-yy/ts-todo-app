import express, { request } from 'express';
import { ICrudService } from '../common/ICrudService';
import { PostgresDB } from '../common/PostgresDB';
import { Task } from './Task';
import { TaskRepository } from './TaskCrudRepository';
import { TaskService } from './TaskServices';

export class TaskController {
    private router: express.Router;
    private service: ICrudService<number, Task>;
    constructor(){
        this.router = express.Router();
        const database = new PostgresDB();
        const repository = new TaskRepository(database);
        this.service = new TaskService(repository);
    }

    private index(request: express.Request, response: express.Response){
        return response.render("task");
    }

    private regist(request: express.Request, response: express.Response){
        // let body: string = this.service.create() + "<br>";
        // body += request.url;
        response.send(request.url);
    }
    private update(request: express.Request, response: express.Response){
        // this.service.update();
        response.send(request.url);
    }
    private list(request: express.Request, response: express.Response){
        // this.service.list();
        response.send(request.url);
    }
    private find(request: express.Request, response: express.Response){
        // this.service.find();
        response.send(request.url);
    }
    private delete(request: express.Request, response: express.Response){
        // this.service.delete();
        response.send(request.url);
    }

    public route(app: express.Express){
        this.router.post('/regist', (req, res)=>this.regist(req, res));
        this.router.get('/update', (req, res)=>this.update(req, res));
        this.router.get('/list', (req, res)=>this.list(req, res));
        this.router.get('/find', (req, res)=>this.find(req, res));
        this.router.get('/delete', (req, res)=>this.delete(req, res));
        this.router.get('/',(req, res)=>{this.index(req,res)});
        return app.use("/task", this.router);
    }
}