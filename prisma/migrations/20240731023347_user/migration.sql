-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profil_pic" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
