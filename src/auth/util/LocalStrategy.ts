import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    async validate(email: string, password: string){
        console.log("Recieved: " +email + " " + password);
        console.log("Inside Local")
        const user = this.authService.validateUser(email, password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}