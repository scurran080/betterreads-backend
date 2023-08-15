export class CreateReviewDto {
    userId: number;
    bookId: number;
    ratingValue: number;
    title: string;
    body: string;
}