-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INVESTOR', 'FOUNDER', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'INVESTOR';
