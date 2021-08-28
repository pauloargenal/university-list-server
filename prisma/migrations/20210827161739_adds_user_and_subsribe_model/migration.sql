-- CreateTable
CREATE TABLE "subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription.email_unique" ON "subscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
