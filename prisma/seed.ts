// scripts/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"


const prisma = new PrismaClient();

async function main() {

  await prisma.user.create({
    data: {
        name: 'Alice MOH',
        email: 'alicemoh@gmail.com',
        password: await bcrypt.hash("password", 10),
        role: 'ADMIN', // Possible values: USER, ADMIN, SUPERADMIN  
        image: 'https://example.com/alice.jpg',
        emailVerified: new Date(),
    },
  });

   await prisma.user.create({
    data: {
        name: 'Robert LOKO',
        email: 'robertloko@gmail.com',
        password: await bcrypt.hash("password", 10),
        role: 'USER', // Possible values: USER, ADMIN, SUPERADMIN  
        image: 'https://example.com/alice.jpg',
        emailVerified: new Date(),
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });