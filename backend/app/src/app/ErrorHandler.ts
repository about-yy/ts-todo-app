import { NextFunction, Request, Response } from "express";
import Logger from "../common/Logger";

export default class ErrorHandler {
    handleError(err: any, req: Request, res: Response, next: NextFunction){
        Logger.error(err);
        next(err);
        return err;
    }
}