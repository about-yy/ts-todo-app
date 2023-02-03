import { configure, getLogger } from "log4js";

export default class Logger {
    static logger(){
        const configFilePath = "./config/log4js.config";
        configure(configFilePath);
        return getLogger();
    }

    static info(message: any, ...args: any[]) {
        args.length > 0 ? 
            this.logger().info(message, args):
            this.logger().info(message);
        return;
    }

    static debug(message: any, ...args: any[]) {
        args.length > 0 ? 
            this.logger().debug(message, args):
            this.logger().debug(message);
        return;
    }

    static error(message: any, ...args: any[]) {
        args.length > 0 ? 
            this.logger().error(message, args):
            this.logger().error(message);
        return;
    }
}