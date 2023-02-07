import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
export default class UserRegistInput {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    username: string;

    
    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    password: string;


}