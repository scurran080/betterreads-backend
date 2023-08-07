-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('REG', 'ADMIN', 'MODERATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountType" "AccountType" NOT NULL DEFAULT 'REG',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
