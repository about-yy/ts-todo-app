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

    private async regist(request: express.Request, response: express.Response){
        const name: string = request.body.name as string;
        const date: Date = new Date();
        const task: Task = new Task(name, Task.STATE_NOTE, date);
        const id: number = await this.service.create(task);
        response.json({"id":id});
    }
    private async update(request: express.Request, response: express.Response){
        const name: string = request.body.name as string;
        const status: number = parseInt(request.body.status as string);
        const id: number = parseInt(request.body.name as string);
        
        const task: Task = await this.service.find(id);
        task.setName(name);
        if(!isNaN(status)) task.updateStatus(status);
        
        const updatedTask: Task = await this.service.update(task);

        response.json(updatedTask);
    }
    private async list(request: express.Request, response: express.Response){
        const offset: number = parseInt(request.query.offset as string);
        const limit: number = parseInt(request.query.limit as string);
        if(isNaN(offset) || isNaN(limit)){
            throw new Error("offset or limit is not a number. offset: "+offset+" limit: "+ limit);
        }
        response.json(await this.service.list(offset, limit));
    }
    private async find(request: express.Request, response: express.Response){
        const id: number = parseInt(request.query.id as string);
        if(isNaN(id)){
            throw new Error("id is not a number. id: "+id);
        }
        response.json(await this.service.find(id));
    }
    private async delete(request: express.Request, response: express.Response){
        const id: number = parseInt(request.query.id as string);
        if(isNaN(id)){
            throw new Error("id is not a number. id: "+id);
        }
        response.json(await this.service.delete(id));
    }

    public route(app: express.Express){
        this.router.post('/regist', (req, res)=>this.regist(req, res));
        this.router.get('/update', (req, res)=>this.update(req, res));
        this.router.get('/list', (req, res)=>this.list(req, res));
        this.router.get('/find', (req, res)=>this.find(req, res));
        this.router.get('/delete', (req, res)=>this.delete(req, res));
        return app.use("/task", this.router);
    }
}