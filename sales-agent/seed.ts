import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { clerkId: "dummy_bypass_user_123" },
    update: {},
    create: {
      clerkId: "dummy_bypass_user_123",
      email: "dummy@sherpas.com",
    }
  });
  console.log("Dummy user created/verified.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
