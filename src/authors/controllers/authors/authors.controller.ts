import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/CreateAuthorDto';
import { UpdateAuthorDto } from 'src/authors/dto/UpdateAuthorDto';
import { AuthorsService } from 'src/authors/services/authors/authors.service';

@Controller('authors')
export class AuthorsController {
    constructor(private authorService: AuthorsService){}

    @Post("create")
    async createAuthor(@Body() createAuthorDto: CreateAuthorDto){
        return this.authorService.createAuthor(createAuthorDto);
    }

    @Get("getById/:id")
    async getById(@Param("id") id: number){
        return this.authorService.getAuthorById(id);
    }

    @Put("updateAuthor")
    async updateAuthor(@Body() updateAuthorDto: UpdateAuthorDto){
        return this.authorService.updateAuthorDetails(updateAuthorDto);
    }

    @Delete("delete/:id")
    @UsePipes(new ValidationPipe({transform: true}))
    async deleteAuthor(@Param("id") id: number){
        return this.authorService.deleteAuthor(id);
    }
}
