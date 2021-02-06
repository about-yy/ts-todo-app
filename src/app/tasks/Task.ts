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

    constructor(id: number, name: string, state: number, date: Date){
        this.id = id; 
        this.status = state;
        this.name = name;
        this.created_at = date;
        this.updated_at = date;
        this.deleted_at = null;
    }

    /**
     * モデルを一意に特定する連想配列を返す
     * @return Object {key: value}
     */
    public getId(){
        return {"id": this.id};
    }

}