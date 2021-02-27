import {DBInterface} from "./DBInterface";
export class PostgresDB implements DBInterface{
    connect(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    query(sql: String, values:[]):any {
        throw new Error("Method not implemented.");
    }
}