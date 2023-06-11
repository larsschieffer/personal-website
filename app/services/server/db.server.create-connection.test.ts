import { describe, expect, it } from "vitest";

const clearDBConnection = (): void => {
  global.__db = undefined;
};

describe("db", () => {
  it("should create db connection", async () => {
    clearDBConnection();
    const { db } = await import("./db.server");

    expect(db).toBeDefined();
    expect(global.__db == db).toBeTruthy();
  });
});
