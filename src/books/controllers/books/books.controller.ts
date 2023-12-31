import { Controller, Post, Param, Body, Get, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookGenre } from '@prisma/client';
import { CreateBookDto } from 'src/books/dto/CreateBookDto';
import { BooksService } from "src/books/services/books/books.service";

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService){}

    @Post("create")
    async createBook(@Body() createBookDto: CreateBookDto){
        return this.bookService.createBook(createBookDto);
    }

    @Get("id/:id")
    @UsePipes(new ValidationPipe({transform: true}))
    async getBookById(@Param("id") id: number){
        return this.bookService.getBookById(id);
    }

    @Get("isbn/:isbn")
    async getBookByISBN(@Param("isbn") isbn: string){
        return this.bookService.getBookByISBN(isbn);
    }

    @Get("getByGenres")
    async getBooksByGenres(genres: BookGenre[]){
       return this.bookService.getBooksByGenre(genres);
    }

    @Put("updateRating")
    async uodateRating(@Body() ratingParams){
        const { id, rating } = ratingParams;
        return this.bookService.updateBookRating(id, rating);
    }

    @Delete("delete")
    async deleteBook(id: number){
        return this.bookService.deleteBook(id);
    }

}
