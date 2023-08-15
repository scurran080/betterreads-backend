import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, BooksModule, AuthorsModule, ReviewsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
