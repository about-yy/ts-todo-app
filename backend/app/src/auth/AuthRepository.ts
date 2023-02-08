import { PrismaClient } from "@prisma/client";
import PrismaUtils from "../common/PrismaUtils";
import Auth from "./Auth";

export default class AuthRepository {
    async findUser(email: string): Promise<Auth>{
        try {            
            const prisma = new PrismaClient();
            const found = await prisma.user.findFirstOrThrow({
                where: {
                    email: email
                }
            });

            const user = new Auth(found.id.toLocaleString(), found.email, found.name, found.password);
            return user;
        } catch (error) {
            throw PrismaUtils.getHttpException(error);
        }
    }
}