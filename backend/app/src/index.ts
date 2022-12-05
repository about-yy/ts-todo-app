import App from "./app/App";
import express from "express";
const expressApp = express();
new App(expressApp).run();
export default expressApp;