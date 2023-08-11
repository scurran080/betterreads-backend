import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookGenre, Prisma } from '@prisma/client';
import { CreateBookDto } from 'src/books/dto/CreateBookDto';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) { }

    verifyGenres(genres: string[]): string[] {
        let acceptedGenres = ["SCIFI", "BIOGRAPHY", "YA", "FANTASY", "HISTORY", "FICTION"];
        if (genres.length < 1 || genres.length > acceptedGenres.length) {
            return null;
        }
        let filterGenres: string[] = [];
        for (let i = 0; i < genres.length; i++) {
            for (let j = 0; j < acceptedGenres.length; j++) {
                if (genres[i] === acceptedGenres[j]) {
                    filterGenres.push(genres[i])
                }
            }
        }
        return filterGenres;

    }

    //It is required that the author actually exists in the database before you can create a book.
    //Will likely keep an unknown author in the database to assign as default if the authorId is not specified.
    async createBook(createBookDto: CreateBookDto) {
        const authorExists = await this.prisma.author.count({
            where: {
                id: createBookDto.authorId
            }
        })
        if (authorExists != 1) {
            createBookDto.authorId = 1;
        }
        const book = await this.prisma.book.create({
            data: {
                title: createBookDto.title,
                isbn: createBookDto.isbn,
                description: createBookDto.description,
                author: {
                    connect: {
                        id: createBookDto.authorId
                    }
                },
                genres: createBookDto.genres,
            },
        });
        return book;
    }

    async getBookById(id: number) {
        const book = await this.prisma.book.findUnique({
            where: {
                id: id
            }
        });
        if (book) {
            return book;
        }
        return null;
    }

    async getBookByISBN(isbn: string) {
        const book = await this.prisma.book.findUnique({
            where: {
                isbn: isbn
            }
        });
        if (book) {
            return book;
        }
        return null;
    }

    //TODO: figure out how to convert the strings into a BookGenre object and then push it to the list of BookGenres
    async getBooksByGenre(genres: BookGenre[]) {        
        const books = await this.prisma.book.findMany({
            where: {
                genres: {
                    hasEvery: genres 
                }
            }
        })
        if (books.length < 1) {
            return null;
        }
        return books;
    }

    //change this to be set when a review is posted or edited.
    async updateBookRating(bookId: number, rating: number) {
        const book = await this.prisma.book.findUnique({
            where: {
                id: bookId,
            }
        })
        if (!book) {
            return null;
        }
        book.ratingSum += rating;
        book.ratingCount += 1;
        book.rating = new Prisma.Decimal(book.ratingSum / book.ratingCount);
        const updatedInfo = await this.prisma.book.update({
            where: {
                id: book.id
            },
            data: {
                ratingCount: book.ratingCount,
                ratingSum: book.ratingSum,
                rating: book.rating
            }
        })
        return updatedInfo; //remove this and add okay signal from api.
    }

    async getBooksByUpvotes(minRating: number) {
        const books = await this.prisma.book.findMany({
            where: {
                rating: {
                    gt: minRating
                }
            }
        })
        return books;
    }

    //TODO: Test this
    async getBooksByRatingInGenre(genres: BookGenre[], minRating) {
        const books = await this.prisma.book.findMany({
            where: {
                genres: {
                    hasEvery: genres,
                },
                rating: {
                    gt: minRating
                }
            }
        })
        return books;
    }

    async deleteBook(id: number) {
        const book = await this.prisma.book.delete({
            where: {
                id: id
            }
        })
        if (!book) {
            return null;
        }
        return book;
    }

}
