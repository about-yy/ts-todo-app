import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import { store } from "../app/store";
import * as ActionTypes from "../app/ActionTypes";

export default class AxiosUtil {
    private static getBackendURL(){
        return import.meta.env.VITE_BACKEND_DOMAIN;
    }
    static async get(path: string, config?: AxiosRequestConfig<unknown>){
        const domain = this.getBackendURL();
        const url = `${domain}${path}`;
        const token = this.getAccessToken();
        if(token ){
            if(!config) config = {headers:{}};
            if(!config.headers) config.headers = {};
            config.headers.authorization = token;
        }

        const result = await axios.get(url, config);
        this.setAccessToken(result);

        return result;
    }

    static async post(path: string, data?: object, config?: AxiosRequestConfig<unknown>){
        const domain = this.getBackendURL();
        const url = `${domain}${path}`;

        const token = this.getAccessToken();
        if(token ){
            if(!config) config = {headers:{}};
            if(!config.headers) config.headers = {};
            config.headers.authorization = token;
        }

        const result = await axios.post(url,data, config);
        this.setAccessToken(result);
        return result;
    }

    private static setAccessToken(result: AxiosResponse){
        if(!result.headers.authorization) return;
        store.dispatch(ActionTypes.SET_ACCESS_TOKEN, result.headers.authorization);
        return ;
    } 
    private static getAccessToken(){
        return store.state.token;
    }

    

}