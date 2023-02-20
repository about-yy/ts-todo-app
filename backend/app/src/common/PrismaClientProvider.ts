import { PrismaClient } from "@prisma/client";

export default class PrismaClientProvider {
    private static _client: PrismaClient;
    static async getClient(){
        if(!this._client){
            this._client = new PrismaClient();
        }
        return this._client;
    }
}