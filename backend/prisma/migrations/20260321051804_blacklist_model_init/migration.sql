-- CreateTable
CREATE TABLE "Blacklist" (
    "id" TEXT NOT NULL,
    "jti" TEXT NOT NULL,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_jti_key" ON "Blacklist"("jti");
