import AuthRepository from "./AuthRepository";
import User from "../user/User";
import { compareSync } from "bcrypt";
import { HttpsError } from "../common/http-error";

export default class AuthService {
    async login(email: string, password: string): Promise<User>{
        const repository = new AuthRepository();
        const user = repository.findUser(email);
        const passwordIsEqual = (await user).comparePassword(password);

        if(passwordIsEqual){
            return user;
        } else {
            throw new HttpsError('unauthenticated', "password or email is not correct");
        }
    }
}