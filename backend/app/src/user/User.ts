export default class User {
    public userId: String;
    public email: String;
    public userName: String;
    public hashedPassword: String 
    
    constructor(userId: String, email: String, userName: String, hashedPassword?: String){
        this.userId = userId;
        this.email = email;
        this.userName = userName;

        if(hashedPassword){
            this.hashedPassword = hashedPassword;
        }
    }

}