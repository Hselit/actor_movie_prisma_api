import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "../../src/generated/prisma";

export const mockPrisma = mockDeep<PrismaClient>();
