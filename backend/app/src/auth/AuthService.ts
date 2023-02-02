import AuthRepository from "./AuthRepository";
import User from "../user/User";

export default class AuthService {
    async login(email: string, password: string): Promise<User>{
        try {
            const repository = new AuthRepository();
            const user = repository.findUser(email, password);
            return user;
        } catch (error) {
            throw new Error("login failed");
        }
    }
}