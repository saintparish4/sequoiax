/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `properties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `startups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "docUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "docUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "startups" ADD COLUMN     "docUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "docUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ALTER COLUMN "supply" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "games_title_key" ON "games"("title");

-- CreateIndex
CREATE UNIQUE INDEX "properties_name_key" ON "properties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "startups_name_key" ON "startups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_name_key" ON "tokens"("name");
