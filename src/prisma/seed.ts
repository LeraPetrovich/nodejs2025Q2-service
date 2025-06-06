import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.favorites.count();
  if (count === 0) {
    await prisma.favorites.create({
      data: {
        id: uuidv4(),
        albums: [],
        artists: [],
        tracks: [],
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
