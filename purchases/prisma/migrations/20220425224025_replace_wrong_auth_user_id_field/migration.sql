/*
  Warnings:

  - You are about to drop the column `authUsedId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Customer_authUsedId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "authUsedId",
ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authUserId_key" ON "Customer"("authUserId");
