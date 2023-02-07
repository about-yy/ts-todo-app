import { NextFunction, Request, Response } from "express";
import { HttpsError } from "../common/http-error";
import Logger from "../common/Logger";

export default class ErrorHandler {

    handleError(err: any, req: Request, res: Response, next: NextFunction){
        Logger.error(err);
        if(err instanceof HttpsError){
            return res.status(err.httpErrorCode.status).send({
                status: err.httpErrorCode.canonicalName,
                msg: err.message
            });
            
        }
        next(err);
        return err;
    }

}