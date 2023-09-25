-- CreateTable
CREATE TABLE "crowdCheckOut" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "abegID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crowdCheckOut_pkey" PRIMARY KEY ("id")
);
