import { PostgresDB } from "./PostgresDB";

export interface DBInterface{
    connect(): Promise<void>;
    query(sql: String, values:Array<any>): any;
    query(sql: String): any;

}