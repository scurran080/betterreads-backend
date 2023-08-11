import { BookGenre } from "@prisma/client";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    title: string;
    isbn: string;
    description: string;
    @IsNotEmpty()
    @IsNumber()
    authorId: number;
    genres?: BookGenre[]
}