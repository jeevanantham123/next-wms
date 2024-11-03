// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Create or update an admin user
  const adminUser = await prisma.users.upsert({
    where: { email: "admin@example.com" }, // Change to your preferred admin email
    update: {}, // No update fields needed, as we just want to create if it doesn't exist
    create: {
      userName: "admin",
      email: "admin@germinit.com", // Unique email for the admin
      password: await hash("admin", 10), // Replace with a hashed password in production
      active: true,
      permissions: {
        connectOrCreate: [
          {
            where: { name: "admin" },
            create: { name: "admin" },
          },
          {
            where: { name: "wms" },
            create: { name: "wms" },
          },
          {
            where: { name: "auditing" },
            create: { name: "auditing" },
          },
        ],
      },
    },
  });

  console.log("Seeded admin user:", adminUser);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
