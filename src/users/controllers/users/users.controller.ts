import { Controller, Body, Post, Get, Param, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { UsersService } from 'src/users/service/users/users.service';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get('signin')
    async signIn(@Body() userInfo){
        const { email, password } = userInfo;
        return this.userService.signIn(email, password);
    }

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        this.userService.createUser(createUserDto);
    }

    @Get("id/:id")
    async getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @Get("user/:username")
    async getUserByUsername(@Param("username") username: string) {
        return this.userService.getUserByUsername(username);
    }

    @Get("users/status")
    async getAccountsByStatus(@Body() status: string) {
        status = status.toUpperCase();  //NORMALIZE
        return this.userService.getUsersByStatus(status);
    }

    @Put("updateUsername")
    async updateAccountUsername(@Body() userId: number, newUsername: string){
        return this.userService.updateAccountUsername(userId, newUsername);
    }

    @Put("updatePassword")
    async updateUserPassword(@Body() userId: number, oldPassword: string, newPassword: string){
        return this.userService.updateUserPassword(userId, oldPassword, newPassword);
    }

    @Put("updateEmail")
    async updateUserEmail(@Body() userId: number, curEmail: string, newEmail: string){
        return this.userService.updateUserEmail(userId, curEmail, newEmail);
    }

}
