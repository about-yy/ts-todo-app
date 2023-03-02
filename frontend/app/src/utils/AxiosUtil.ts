import axios, {AxiosRequestConfig} from "axios";

export default class AxiosUtil {
    private static getBackendURL(){
        return import.meta.env.VITE_BACKEND_DOMAIN;
    }
    static async get(path: string){
        const domain = this.getBackendURL();
        const url = `${domain}/${path}`;
        axios
            .get(domain+url)
            
        return "hello from axios util get "+ domain;
    }

    static async post(path: string, data?: {}, config?: AxiosRequestConfig<any>){
        const domain = this.getBackendURL();
        const url = `${domain}/${path}`;
        return await axios.post(url,data, config);
    }

}