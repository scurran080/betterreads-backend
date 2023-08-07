import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from 'src/authors/services/authors/authors.service';

@Controller('authors')
export class AuthorsController {
    constructor(private authorService: AuthorsService){}

    @Post("create")
    async createAuthor(@Body() authorDetails){
        return this.authorService.createAuthor(authorDetails);
    }

    @Get("getById/:id")
    async getById(@Param("id") id: number){
        return this.authorService.getAuthorById(id);
    }

    @Put("update/:id")
    async updateAuthor(@Param("id") id: number, @Body() authorDetails){
        return this.authorService.updateAuthorDetails(id, authorDetails);
    }

    @Delete("delete/:id")
    @UsePipes(new ValidationPipe({transform: true}))
    async deleteAuthor(@Param("id") id: number){
        return this.authorService.deleteAuthor(id);
    }
}
