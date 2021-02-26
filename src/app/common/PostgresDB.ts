import { Client } from "pg";

export class PostgresDB{
    protected client: Client;

    constructor(){
        const sslmode = (process.env.SSL_MODE=="true");

        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {rejectUnauthorized: sslmode},
        });
        this.connect();
    }

    connect(){
        this.client.connect();
        setTimeout(()=>this.client.end(), 50000);
    }
    
}