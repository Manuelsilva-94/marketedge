-- AlterTable
ALTER TABLE "Market" ADD COLUMN "polyTokenIds" TEXT;

-- CreateTable
CREATE TABLE "PriceCache" (
    "matchId" TEXT NOT NULL,
    "polyYesPrice" DOUBLE PRECISION NOT NULL,
    "polyNoPrice" DOUBLE PRECISION NOT NULL,
    "kalshiYesPrice" DOUBLE PRECISION NOT NULL,
    "kalshiNoPrice" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceCache_pkey" PRIMARY KEY ("matchId")
);

-- AddForeignKey
ALTER TABLE "PriceCache" ADD CONSTRAINT "PriceCache_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "MarketMatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
