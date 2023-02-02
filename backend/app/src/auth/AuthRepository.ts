import User from "../user/User";
import { PrismaClient } from "@prisma/client";

export default class AuthRepository {
    async findUser(email: string, password: string): Promise<User>{
        const prisma = new PrismaClient();
        const found = await prisma.user.findFirstOrThrow({
            where: {
                email: email,
                password: password
            }
        });
        const user = new User(found.id.toLocaleString(), found.email, found.name);
        return user;
    }
}