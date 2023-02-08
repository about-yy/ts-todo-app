import AuthRepository from "./AuthRepository";
import User from "../user/User";
import { HttpsError } from "../common/http-error";
import Auth from "./Auth";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "../app/config";

export default class AuthService {
    async login(email: string, password: string): Promise<User>{
        const repository = new AuthRepository();
        const authUser: Auth =  await repository.findUser(email);
        const passwordIsEqual = authUser.comparePassword(password);

        if(passwordIsEqual){
            const user: User = new User(authUser.userId, authUser.email, authUser.userName);
            return user;
        } else {
            throw new HttpsError('unauthenticated', "password or email is not correct");
        }
    }
    
    async isLogined(token: string|undefined){
        if(!token){
            throw new HttpsError("unauthenticated", "no token");
        }
        try {
            return jwt.verify(token, config.SECRET_KEY);
        } catch (e: any){
            if(e instanceof JsonWebTokenError){
                throw new HttpsError("unauthenticated", "invalid token");
            } else {
                throw e;
            }
        }
        
    }
}