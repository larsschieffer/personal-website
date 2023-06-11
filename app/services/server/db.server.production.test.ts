import { describe, expect, it, vi } from "vitest";

const clearDBConnection = (): void => {
  global.__db = undefined;
};

const setProductionEnvironment = (): void => {
  vi.stubEnv("NODE_ENV", "production");
};

describe("db", () => {
  it("should create db connection", async () => {
    clearDBConnection();
    setProductionEnvironment();

    const { db } = await import("./db.server");

    expect(db).toBeDefined();
    expect(global.__db == undefined).toBeTruthy();
  });
});
