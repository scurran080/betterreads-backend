import { Module } from '@nestjs/common';
import { ReviewsController } from './controller/reviews/reviews.controller';
import { ReviewsService } from './services/reviews/reviews.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService]
})
export class ReviewsModule {}
