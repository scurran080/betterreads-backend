/*
  Warnings:

  - You are about to drop the column `genre` on the `Book` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BANNED', 'ACTIVE', 'INACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genre",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "genres" "BookGenre"[],
ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" "Status" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
