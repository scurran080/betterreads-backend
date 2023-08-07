/*
  Warnings:

  - The `genres` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "authorId" DROP NOT NULL,
DROP COLUMN "genres",
ADD COLUMN     "genres" TEXT[];

-- DropEnum
DROP TYPE "BookGenre";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
