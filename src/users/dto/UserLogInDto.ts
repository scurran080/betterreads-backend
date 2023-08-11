import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLogInDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}