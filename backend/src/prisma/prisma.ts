import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `postgresql://postgres:senai@3.238.56.78:5432/clinic?schema=public`;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter, log: ['query'] });
