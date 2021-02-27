import { PostgresDB } from "./PostgresDB";

export interface DBInterface{
    connect(): Promise<boolean>;
    query(sql: String, values:Array<any>): any;
}