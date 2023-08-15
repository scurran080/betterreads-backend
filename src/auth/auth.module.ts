import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './util/LocalStrategy';
import { UsersService } from 'src/users/service/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './controllers/auth/auth.controller';



@Module({
  providers: [ AuthService, UsersService, LocalStrategy, PrismaService],
  imports: [UsersModule, PassportModule],
  controllers: [AuthController]

})
export class AuthModule { }
