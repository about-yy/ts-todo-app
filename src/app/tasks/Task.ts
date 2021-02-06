export class Task{
    static STATE_NOTE = 0;    // 上げただけ
    static STATE_PLAN = 1;    // 計画を立てた
    static STATE_DONE = 2;    // 実施済み

    id: number;
    name:string;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date|null;

    constructor(id: number|null, name: string, state: number|null){
        if(typeof id == "number"){
            this.id = id; 
        } else {
            // TODO 新規ID 採番処理を追加する
            this.id = 0;
        }
        if(typeof state == "number") {
            this.status = state;
        } else {
            this.status = Task.STATE_NOTE;
        }
        this.name = name;
        this.created_at = new Date();
        this.updated_at = this.created_at;
        this.deleted_at = null;
    }

}