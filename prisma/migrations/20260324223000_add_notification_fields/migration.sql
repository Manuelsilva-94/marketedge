-- AlterTable
ALTER TABLE "User" ADD COLUMN "emailNotifications" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "telegramChatId" TEXT;
ALTER TABLE "User" ADD COLUMN "telegramVerifyCode" TEXT;
ALTER TABLE "User" ADD COLUMN "telegramVerifyExpiry" TIMESTAMP(3);
