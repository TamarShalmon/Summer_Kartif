import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// שימוש במשתנה גלובלי לשמירת מופע ה-Prisma
const globalForPrisma = globalThis || {};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

// אם הסביבה היא לא "production", שמור את מופע ה-Prisma במשתנה גלובלי
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
