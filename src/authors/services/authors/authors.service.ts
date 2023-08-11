import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/CreateAuthorDto';
import { UpdateAuthorDto } from 'src/authors/dto/UpdateAuthorDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) { }

    async createAuthor(createAuthroDto: CreateAuthorDto) {
        const author = await this.prisma.author.create({
            data: {
                firstName: createAuthroDto.firstName,
                lastName: createAuthroDto.lastName,
                about: createAuthroDto.about,
                pictureUrl: createAuthroDto.pictureUrl
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

    async updateAuthorDetails(updateAuthorDto: UpdateAuthorDto) {
        const updatedAuthor = await this.prisma.author.update({
            where: {
                id: updateAuthorDto.authorId,
            },
            data: {
                firstName: updateAuthorDto.firstName,
                lastName: updateAuthorDto.lastName,
                about: updateAuthorDto.about,
                pictureUrl: updateAuthorDto.pictureUrl
            }
        })
        if (updatedAuthor) {
            return updatedAuthor;
        }
        return null;
    }


    async getAuthorsByName(name: string) {
        const foundAuthors = await this.prisma.author.findMany({
            where: {
                OR: [{
                    firstName: {
                        contains: name,
                        mode: "insensitive"
                    },
                    lastName: {
                        contains: name,
                        mode: "insensitive"
                    }
                }]
            }
        })
        return foundAuthors;
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
