import AuthRepository from "./AuthRepository";
import User from "../user/User";
import { compareSync } from "bcrypt";
import { HttpsError } from "../common/http-error";

export default class AuthService {
    async login(email: string, password: string): Promise<User>{
        try {
            const repository = new AuthRepository();
            const user = repository.findUser(email);
            const passwordIsEqual = compareSync(password, (await user).hashedPassword.toString());

            if(passwordIsEqual){
                return user;
            } else {
                throw new HttpsError('unauthenticated', "password or email is not correct");
            }
        } catch (error) {
            throw new Error("login failed");
        }
    }
}