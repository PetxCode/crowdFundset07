-- CreateTable
CREATE TABLE "crowdAbeg" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "detailDescription" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "pictureID" TEXT NOT NULL,
    "amountNeeded" INTEGER NOT NULL,
    "amountRaised" INTEGER NOT NULL,
    "givers" JSONB NOT NULL,
    "love" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crowdAbeg_pkey" PRIMARY KEY ("id")
);
