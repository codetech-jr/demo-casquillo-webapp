import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding tables...");

    // Limpiar primero (Cuidado: Borra DB)
    await prisma.reservation.deleteMany();
    await prisma.table.deleteMany();

    // Las mesas base "El Casquillo de Oro"
    const tables = [
        { number: 1, zone: "Tarima" },
        { number: 2, zone: "Tarima" },
        { number: 3, zone: "Tarima" },
        { number: 4, zone: "Terraza VIP" },
        { number: 5, zone: "Terraza VIP" },
        { number: 6, zone: "Terraza VIP" },
    ];

    for (const table of tables) {
        await prisma.table.create({
            data: table,
        });
    }

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
