import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {

    const hashedPassword = await bcrypt.hash(
        "Manager@123",
        10
    );

    const manager = await prisma.user.upsert({
        where: {
            email: "manager@test.com",
        },

        update: {},

        create: {
            firstName: "System",
            lastName: "Manager",
            email: "manager@test.com",
            password: hashedPassword,
            role: "MANAGER",
        },
    });

    console.log("Manager created:", manager.email);
};


main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });