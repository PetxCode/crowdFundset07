/*
  Warnings:

  - Added the required column `avatar` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarID` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyLocation` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyRole` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `history` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telNumb` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `crowdProile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletBalance` to the `crowdProile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "crowdProile" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "avatarID" TEXT NOT NULL,
ADD COLUMN     "companyLocation" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyRole" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "history" JSONB NOT NULL,
ADD COLUMN     "telNumb" TEXT NOT NULL,
ADD COLUMN     "userID" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "walletBalance" INTEGER NOT NULL;
