import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateReviewDto } from 'src/reviews/dto/CreateReviewDto';
import { UpdateReviewDto } from 'src/reviews/dto/UpdateReviewDto';
import { ReviewsService } from 'src/reviews/services/reviews/reviews.service';

@Controller('reviews')
export class ReviewsController {

    constructor(private reviewService: ReviewsService){}

    @Post("create")
    async createReview(@Body() createReviewDto: CreateReviewDto){
        return this.reviewService.createReview(createReviewDto);
    }
    
    @Get("/id/:id")
    async getReviewById(@Param("id") id: number){
        return this.reviewService.getReviewById(id);
    }

    @Get("userId/:userId")
    async getByUserId(@Param("userId") userId: number){
        return this.reviewService.getReviewByUserId(userId)
    }

    @Put("update")
    async updateReview(@Body() updateReviewDto: UpdateReviewDto){
        return this.reviewService.updateReview(updateReviewDto);
    }

}
