/*
  Warnings:

  - Added the required column `userID` to the `crowdAbeg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "crowdAbeg" ADD COLUMN     "userID" TEXT NOT NULL;
