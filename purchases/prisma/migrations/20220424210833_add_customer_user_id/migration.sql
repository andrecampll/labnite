/*
  Warnings:

  - A unique constraint covering the columns `[authUsedId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "authUsedId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authUsedId_key" ON "Customer"("authUsedId");
