import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      username: "admin",
      password: "admin",
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      username: "user",
      password: "password",
    },
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
