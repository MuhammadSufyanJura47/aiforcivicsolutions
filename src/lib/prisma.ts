import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: InstanceType<typeof PrismaClient>;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Add it to the Vercel project environment variables.",
    );
  }

  const parsedUrl = new URL(databaseUrl);
  const adapter = new PrismaMariaDb({
    host: parsedUrl.hostname,
    port: Number(parsedUrl.port || 3306),
    user: decodeURIComponent(parsedUrl.username),
    password: decodeURIComponent(parsedUrl.password),
    database: parsedUrl.pathname.slice(1),
    ssl: parsedUrl.searchParams.get("ssl") === "true",
    connectionLimit: 5,
    acquireTimeout: 60000,
    connectTimeout: 30000,
  });

  return new PrismaClient({ adapter });
}

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as InstanceType<typeof PrismaClient>, {
  get(_target, property, receiver) {
    const value = Reflect.get(getPrismaClient(), property, receiver);
    return typeof value === "function"
      ? value.bind(getPrismaClient())
      : value;
  },
});