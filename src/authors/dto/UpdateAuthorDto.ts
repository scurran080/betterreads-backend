import { IsNotEmpty } from "class-validator";

export class UpdateAuthorDto {
    @IsNotEmpty()
    authorId: number;
    firstName: string;
    lastName: string;
    description: string;
    about: string;
    pictureUrl: string;
}