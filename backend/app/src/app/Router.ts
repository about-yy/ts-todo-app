import express from "express";

export default class Router {
    router: any;
    constructor(){
        this.router = express.Router();
    }
}