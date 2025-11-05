import path from "path";
import { Verifier } from "@pact-foundation/pact";
import { server } from "./provider.js";

describe("Pact Verification", () => {
  test("validates the expectations of TodoConsumer", async () => {
    const opts = {
      providerBaseUrl: "http://localhost:3000",
      pactUrls: [path.resolve(process.cwd(), "pacts/TodoConsumer-TodoProvider.json")],
    };

    const verifier = new Verifier(opts);
    const output = await verifier.verifyProvider();
    console.log("Pact Verification Complete:", output);
    server.close();
  });
});