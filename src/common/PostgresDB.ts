import { Client } from "pg";
import {DBInterface} from "./DBInterface";
export class PostgresDB extends Client implements DBInterface{
    constructor();
    constructor(){
        const sslmode = (process.env.SSL_MODE=="true");
        const config = { 
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: sslmode
            },
        };
        super(config);
        this.connect();
    }
    async connect(){
        super.connect()
        setTimeout(()=>this.end(), 50000);
        return ;
    }
}