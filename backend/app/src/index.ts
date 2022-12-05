import App from "./app/App";
import express from "express";
const expressApp = express();
new App(expressApp).run();

import { configure, getLogger, Log4js } from "log4js";
configure("./config/log4js.config");
const logger = getLogger();
logger.debug('Hello World!!!!');
export default expressApp;