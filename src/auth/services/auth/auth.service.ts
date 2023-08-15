import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    async validateUser(email: string, password: string){
        const userFromDb = await this.userService.findUser(email);
        console.log(userFromDb);
        const matches: boolean = await bcrypt.compare(password, userFromDb.password).then(function (result) {})
        if(matches == true){
            return userFromDb;
        }
        return null;
    }
}
