import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { HttpsError } from "./http-error";

export default class PrismaUtils {
    
    static getHttpException(e: any){
        if(e instanceof PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return new HttpsError('already-exists', "既に存在するユーザです。", e);
            }
        }

        return new HttpsError('internal', 'internal server error', e);
    }
}