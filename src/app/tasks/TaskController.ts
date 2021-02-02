import express, { request } from 'express';

class TaskController {
    private router: express.Router;
    private service: CrudService<any, any>;
    constructor(){
        this.router = express.Router();
        this.service = new TaskService();
        this.router.get('/regist', this.regist);
        this.router.get('/update', this.update);
        this.router.get('/list', this.list);
        this.router.get('/find', this.find);
        this.router.get('/delete', this.delete);
    }

    private regist(request: express.Request, response: express.Response){
        this.service.create();
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

}