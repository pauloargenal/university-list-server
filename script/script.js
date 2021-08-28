import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const main = async () => {
  const transactions = await prisma.user.deleteMany();

  console.log(transactions);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
