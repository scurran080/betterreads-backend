import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books/books.controller';
import { BooksService } from './services/books/books.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService]
})
export class BooksModule {}
