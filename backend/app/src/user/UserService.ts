import User from "./User";
import UserRepository from "./UserRepository";

export default class UserService {
    async regist(email: string, username: string, password: string): Promise<User>{
        const userRepository = new UserRepository();
        const registedUser = userRepository.registUser(email, username, password);
        return registedUser;
    }
}