import { NextFunction, Request, Response } from "express";
import { HttpsError } from "../common/http-error";

export default class ErrorHandler {

    handleError(err: any, req: Request, res: Response, next: NextFunction){
        if(err instanceof HttpsError){
            return res.status(err.httpErrorCode.status).send({
                result: false,
                status: err.httpErrorCode.canonicalName,
                msg: err.message
            });
            
        }
        next(err);
        return err;
    }

}