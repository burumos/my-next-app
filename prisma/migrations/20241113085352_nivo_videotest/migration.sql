-- CreateTable
CREATE TABLE "NicoVideo" (
    "userId" INTEGER NOT NULL,
    "contentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lengthSeconds" INTEGER NOT NULL,
    "likeCounter" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "viewCounter" INTEGER NOT NULL,
    "commentCounter" INTEGER NOT NULL,
    "mylistCounter" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "NicoVideo_contentId_userId_key" ON "NicoVideo"("contentId", "userId");

-- AddForeignKey
ALTER TABLE "NicoVideo" ADD CONSTRAINT "NicoVideo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
