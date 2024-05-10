import { PrismaClient } from "@prisma/client";
import { describe, expect, it } from "vitest";

const initDBConnection = (): PrismaClient => {
  global.__db = new PrismaClient();
  return global.__db;
};

describe("db", () => {
  it("should reuse db connection", async () => {
    const dbConnection = initDBConnection();
    const { db } = await import("./db.server");

    expect(db == dbConnection).toBeTruthy();
  });
});
