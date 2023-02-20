import PrismaClientProvider from "../common/PrismaClientProvider";
import PrismaUtils from "../common/PrismaUtils";
import User from "./User";

export default class UserRepository {
    async registUser(email: string, username: string, password: string): Promise<User>{
        try {
            const prisma = await PrismaClientProvider.getClient();
            const createdUser = await prisma.user.create({
                data: {
                    email: email,
                    name: username,
                    password: password
                }
            })
    
            return new User(createdUser.id.toLocaleString(), createdUser.email, createdUser.name);            
        } catch (error) {
            throw PrismaUtils.getHttpException(error);
        }
    }
}