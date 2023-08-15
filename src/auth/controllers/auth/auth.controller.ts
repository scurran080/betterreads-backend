import { Controller, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
    constructor(){}

    @UseGuards(AuthGuard('local'))
    @Post("login")
    async login(@Request() req){
        
    }

}
