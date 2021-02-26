import {Client} from "pg"
import * as dotenv from "dotenv";
dotenv.config();

test("select check", async()=>{
    const db: Client = new Client({
        connectionString: process.env.DATABASE_URL
    });
})