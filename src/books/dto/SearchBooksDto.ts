import { BookGenre } from "@prisma/client";

export class SearchBooksDto {
    rating: number;
    genres: BookGenre[];
    
}