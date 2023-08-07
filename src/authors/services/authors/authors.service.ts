import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) { }

    async createAuthor(authorDetails) {
        const { firstName, lastName, about, pictureUrl } = authorDetails;
        const author = await this.prisma.author.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                about: about,
                pictureUrl: pictureUrl
            }
        })
        return author;
    }

    async getAuthorById(id: number) {
        const author = await this.prisma.author.findUnique({
            where: {
                id: id,
            }
        })
        if (author) {
            return author;
        }
        return null;
    }

    async updateAuthorDetails(authorId: number, authorDetails) {
        const { firstName, lastName, about, pictureUrl } = authorDetails;
        const updatedAuthor = await this.prisma.author.update({
            where: {
                id: authorId,
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                about: about,
                pictureUrl: pictureUrl
            }
        })
        if (updatedAuthor) {
            return updatedAuthor;
        }
        return null;
    }

    async deleteAuthor(id: number) {
        const exists = await this.prisma.book.count({
            where: {
                authorId: id
            }
        })
        if (exists != 0) {
            return {
                status: 401,
                message: "Cannot delete author that is assigned to books."

            }
        }
        const deletedAuthor = await this.prisma.author.delete({
            where: {
                id: id
            }
        })
        return deletedAuthor;
    }

}
