import path from "path";
import { Verifier } from "@pact-foundation/pact";
import { server } from "./provider.js";
import dotenv from "dotenv";

dotenv.config();

afterAll(() => {
  server.close();
});

describe("Pact Verification", () => {
  test("validates the expectations of TodoConsumer", async () => {
  const opts = {
    providerBaseUrl: process.env.PROVIDER_BASE_URL || "http://todo-provider:3000",
    pactUrls: [path.resolve(process.cwd(), "pacts/TodoConsumer-TodoProvider.json")],
  };

  const verifier = new Verifier(opts);
  const output = await verifier.verifyProvider();
  console.log("✅ Pact Verification Complete:\n", output);
}, 20000); // ⬅️ Increase timeout to 20 seconds
});
