export default class User {
    public userId: String;
    public email: String;
    public userName: String;
    
    constructor(userId: String, email: String, userName: String){
        this.userId = userId;
        this.email = email;
        this.userName = userName;
    }

}