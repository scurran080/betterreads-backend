import { Module } from '@nestjs/common';
import { AuthorsController } from './controllers/authors/authors.controller';
import { AuthorsService } from './services/authors/authors.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, PrismaService]
})
export class AuthorsModule {}
