import path from "path";
import { Verifier } from "@pact-foundation/pact";
import { server } from "./provider.js";
import dotenv from "dotenv";

dotenv.config();

describe("Pact Verification", () => {
  test("validates the expectations of TodoConsumer", async () => {
    const opts = {
      providerBaseUrl: process.env.PROVIDER_BASE_URL || "http://localhost:3000",
      pactUrls: [path.resolve(process.cwd(), "pacts/todo_consumer-todo_provider.json")],
    };

    // const opts = {
    //   providerBaseUrl: "http://localhost:3000",
    //   pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
    //   provider: "TodoProvider",
    //   consumerVersionSelectors: [{ latest: true }],
    //   publishVerificationResult: true,
    //   providerVersion: "1.0.0",
    //   pactBrokerToken: process.env.PACT_BROKER_TOKEN,
    // };

    const verifier = new Verifier(opts);
    const output = await verifier.verifyProvider();
    console.log("Pact Verification Complete:", output);
    server.close();
  });
});