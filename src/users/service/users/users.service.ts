import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async signIn(email: string, password: string) {

    }

    async createUser(username: string, email: string, password: string, firstName?: string,
        lastName?: string) {
        const userExists = await this.prisma.user.count({
            where: {
                OR: [
                    {
                        username: username
                    },
                    {
                        email: email
                    }

                ]
            }
        });
        if (userExists != 0) {
            return ({
                status: 400,
                message: "User with username or email already exists."
            })
        }
        //hash password here.
        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                password,
                firstName,
                lastName,
            }
        })
    }

    async getUserById(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: Number(userId) }
        });
        if (user) {
            return user;
        }
        return null;
    }

    //TODO: TEST
    async getUserByUsername(userName: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: String(userName)
            }
        });
        if (!user) {
            return null;
        }
        return user;
    }

    //TODO: TEST
    async getUserByEmail(emailAddress: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: emailAddress
            }
        })
        if (!user) {
            return null;
        }
        return user;
    }

    //TODO: TEST
    async getUsersByStatus(status: string) {
        if (status !== "ACTIVE" && status !== "BANNED" && status !== "INACTIVE" && status !== "SUSPENDED") {
            return null;
        }
        const users = await this.prisma.user.findMany({
            where: {
                accountStatus: status
            }
        })
        return users;
    }

    //TODO: TEST
    async updateAccountUsername(userId: number, newUsername: string) {
        const available = await this.prisma.user.findUnique({
            where: {
                username: newUsername
            }
        })
        if (!available) {
            return null;
        }
        const updatedUser = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                username: newUsername
            }
        });
        if (!updatedUser) {
            return null;
        }
        return updatedUser;
    }

    //TODO: TEST
    async updateUserPassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (user.password === oldPassword) {
            user.password = newPassword;
            const updated = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: newPassword
                }
            });
            return user; //remove this and send ok response.
        }
    }

    //TODO: TEST
    async updateUserEmail(userId: number, curEmail: string, newEmail: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user || user.email !== curEmail) {
            return null;
        }
        const exists = await this.prisma.user.count({
            where: {
                email: newEmail
            }
        })
        if (exists) {
            return null;
        }
        const updatedInfo = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                email: newEmail
            }
        })
    }

    async deleteUser(id: number) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id: id
            }
        })
        if (!deletedUser) {
            return ({
                status: 401,
                message: "Unable to delete user"
            });
        }
        return deletedUser;
    }
}
