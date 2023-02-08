import { compareSync } from "bcrypt";

export default class Auth {
    public userId: String;
    public email: String;
    public userName: String;
    private hashedPassword: string

    constructor(userId: String, email: String, userName: String, hashedPassword?: string){
        this.userId = userId;
        this.email = email;
        this.userName = userName;

        if(hashedPassword){
            this.hashedPassword = hashedPassword;
        }
    }

    public comparePassword(password: string){
        if(!password || !this.hashedPassword){
            return false;
        } else {
            return compareSync(password, this.hashedPassword);
        }
    }

}