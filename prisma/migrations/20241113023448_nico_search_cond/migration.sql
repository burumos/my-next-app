-- CreateTable
CREATE TABLE "NicoSearchCondition" (
    "id" SERIAL NOT NULL,
    "q" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "minimumViews" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "NicoSearchCondition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NicoSearchCondition" ADD CONSTRAINT "NicoSearchCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
