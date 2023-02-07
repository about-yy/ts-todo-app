import { hash, hashSync } from "bcrypt";
import User from "./User";
import UserRepository from "./UserRepository";

export default class UserService {
    async regist(email: string, username: string, password: string): Promise<User>{
        const userRepository = new UserRepository();
        const hashedPassword = hashSync(password, 10);
        const registedUser = userRepository.registUser(email, username, hashedPassword);
        return registedUser;
    }
}