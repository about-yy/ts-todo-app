import AuthRepository from "./AuthRepository";
import User from "../user/User";
import { HttpsError } from "../common/http-error";
import Auth from "./Auth";

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
}