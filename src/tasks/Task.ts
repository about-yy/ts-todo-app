import { runInThisContext } from "vm";

export class Task{
    static STATE_NOTE = 0;    // 上げただけ
    static STATE_PLAN = 1;    // 計画を立てた
    static STATE_DONE = 2;    // 実施済み

    id!: number | null;
    name!: string;
    status!: number;
    created_at!: Date;
    updated_at!: Date;
    deleted_at!: Date | null;

    constructor(taskRecord: {[P in keyof Task]: string});
    constructor(name: string, state: number, date: Date);
    constructor(arg1: {[P in keyof Task]: string} | string , state?: number, date?: Date){
        if(typeof arg1 == "object"){
            const taskRecord = arg1;
            this.id = parseInt(taskRecord.id);
            this.name = taskRecord.name;
            this.status = parseInt(taskRecord.status);
            this.created_at = new Date(taskRecord.created_at);
            this.updated_at = new Date(taskRecord.updated_at);
            this.deleted_at = new Date(taskRecord.deleted_at);
        } else if(typeof arg1 == "string" && state != null && date != null){
            const name = arg1;
            this.id = null;
            this.name = name;
            this.status = state;
            this.created_at = date;
            this.updated_at = date;
            this.deleted_at = null;
        }
    }
    
    public getId(): number{
        return this.id ? this.id : 0;
    }
    public getFields(): {[P in keyof Task]?: Task[P] } {
        return Object.assign({}, this);
    }

    public updateStatus(status: number): void{
        if(status != Task.STATE_NOTE && status != Task.STATE_PLAN && status != Task.STATE_DONE){
            throw new Error("Task Status should Be TaskState");
        } else {
            this.status = status;
        }
    }

    public getStatus(){
        return this.status;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void{
        if(name != null && name != ""){
            this.name = name;
        } else {
            throw new Error("Task Name is not nullable");
        }
    }

}

