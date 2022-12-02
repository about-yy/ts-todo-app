import App from "./app/App";
import express from "express";
const expressApp = express();
new App(expressApp).run();

import { configure, getLogger, Log4js } from "log4js";
configure({
    appenders: {
      app: { type: "file", filename: "log.txt" },
    },
    categories: {
      default: { appenders: ["app"], level: "debug" },
    },
  });
const logger = getLogger();
logger.debug('Hello World!!!!');
export default expressApp;