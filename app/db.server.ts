import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "~/generated/prisma/client";

const createClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT ?? 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  return new PrismaClient({ adapter });
};

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = createClient();
} else {
  if (!global.__db__) {
    global.__db__ = createClient();
  }
  prisma = global.__db__;
  prisma.$connect();
}

export { prisma };
