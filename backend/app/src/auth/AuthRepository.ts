import User from "../user/User";
import { PrismaClient } from "@prisma/client";
import PrismaUtils from "../common/PrismaUtils";

export default class AuthRepository {
    async findUser(email: string, password: string): Promise<User>{
        try {            
            const prisma = new PrismaClient();
            const found = await prisma.user.findFirstOrThrow({
                where: {
                    email: email,
                    password: password
                }
            });
            const user = new User(found.id.toLocaleString(), found.email, found.name);
            return user;
        } catch (error) {
            throw PrismaUtils.getHttpException(error);
        }
    }
}