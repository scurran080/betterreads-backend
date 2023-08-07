/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CountryCode" AS ENUM ('USA', 'CANADA', 'MEXICO', 'GERMANY', 'FRANCE', 'UK', 'IRELAND', 'ITALY', 'CHINA', 'JAPAN', 'AUSTRIA', 'AUSTRALIA', 'INDIA', 'BRAZIL', 'DENMARK', 'SPAIN', 'PORTUGAL');

-- CreateEnum
CREATE TYPE "BookGenre" AS ENUM ('ADVENTURE', 'MYSTERY', 'CRIME', 'HORROR', 'BIOGRAPHY', 'FICTION', 'NONFICTION', 'FANTASY', 'SCIFI', 'CHILDREN', 'YOUNGADULT', 'ROMANCE', 'CLASSICS');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "description" TEXT,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "genre" "BookGenre",
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "about" TEXT,
    "pictureUrl" TEXT,
    "homeCountry" "CountryCode",

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
