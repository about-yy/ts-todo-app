import { NextFunction, Request, Response } from "express";
import { HttpsError } from "./http-error";
import Logger from "./Logger";


export default class ErrorHandler {

    handleError(err: any, req: Request, res: Response, next: NextFunction){
        if(err instanceof HttpsError){
            if(err.code === "internal"){
                Logger.error(err);
            }
            return res.status(err.httpErrorCode.status).send({
                result: false,
                status: err.httpErrorCode.canonicalName,
                msg: err.message
            });
            
        }
        Logger.error(err);
        next(err);
        return err;
    }

}