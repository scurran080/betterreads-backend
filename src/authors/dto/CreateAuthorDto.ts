import { IsNotEmpty } from "class-validator";

export class CreateAuthorDto {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    about?:string;
    pictureUrl?: string;
}