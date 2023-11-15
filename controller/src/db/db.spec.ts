import { client } from ".";

describe("db", () => {
  it("should return a db instance", () => {
    expect(client).toBeDefined();
  });

  it("should connect to the db", async () => {
    await client.connect();
    expect(client).toBeDefined();
  });
})