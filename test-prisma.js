const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.trip.update({
      where: {
        id: "cmqqbf8em00029qensp4p0ik5"
      },
      data: {
        title: "sakinah",
        slug: "sakinah-a8ta",
        destinationId: "cmqqbedg200009qenkdamjkbi",
        durationDays: 3,
        durationNights: 2,
        description: "oke",
        basePrice: 20000000,
        pricingOptions: [
          {
            name: "oke",
            price: 19999999
          }
        ],
        featuredImage: "test",
        rating: 5,
        reviewCount: 0,
      }
    });
    console.log("Success");
  } catch (e) {
    console.error("ERROR CAUGHT:");
    console.error(e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
