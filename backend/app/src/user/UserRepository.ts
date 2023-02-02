import { PrismaClient } from "@prisma/client";
import User from "./User";

export default class UserRepository {
    async registUser(email: string, username: string, password: string): Promise<User>{
        const prisma = new PrismaClient();
        const createdUser = await prisma.user.create({
            data: {
                email: email,
                name: username,
                password: password
            }
        })

        return new User(createdUser.id.toLocaleString(), createdUser.email, createdUser.name);
    }
}