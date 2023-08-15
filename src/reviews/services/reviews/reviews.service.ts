import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from 'src/reviews/dto/CreateReviewDto';
import { UpdateReviewDto } from 'src/reviews/dto/UpdateReviewDto';

@Injectable()
export class ReviewsService {

    constructor(private prisma: PrismaService) { }

    async createReview(createReviewDto: CreateReviewDto) {
        return this.prisma.review.create({
            data: {
                user: {
                    connect: {
                        id: createReviewDto.userId,
                    }
                },
                book: {
                    connect: {
                        id: createReviewDto.bookId,
                    }
                },
                ratingValue: createReviewDto.ratingValue,
                title: createReviewDto.title,
                body: createReviewDto.body,
            }
        })
    }

    async getReviewById(reviewId: number){
        return this.prisma.review.findUnique({
            where: {
                id: reviewId,
            }
        });
    }

    async getReviewByUserId(userId: number){
        const reviews = await this.prisma.review.findMany({
            where: {
                userId: userId,
            }
        })
    }

    async getReviewByBookId(bookId: number){
        return this.prisma.review.findMany({
            where: {
                bookId: bookId,
            }
        });
    }


    async getReviewsByBook(bookTitle: string){
        
    }



    async updateReview(updateReviewDto: UpdateReviewDto){
        return this.prisma.review.update({
            where: {
                id: updateReviewDto.reviewId,
            },
            data: {
                ratingValue: updateReviewDto.ratingValue,
                title: updateReviewDto.title,
                body: updateReviewDto.body,
            }
        })
    }

    async deleteReview(reviewId: number){
        return this.prisma.review.delete({
            where: {
                id: reviewId,
            }
        })
    }


}
