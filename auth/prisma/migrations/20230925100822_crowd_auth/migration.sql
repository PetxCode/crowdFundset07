-- CreateTable
CREATE TABLE "crowdAuth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "verify" BOOLEAN NOT NULL,
    "secretKey" TEXT NOT NULL,
    "profile" JSONB NOT NULL,
    "abeg" JSONB NOT NULL,

    CONSTRAINT "crowdAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crowdAuth_email_key" ON "crowdAuth"("email");
