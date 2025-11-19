import path from "path";
import { Verifier } from "@pact-foundation/pact";
import { server } from "./provider.js";

afterAll(() => server.close());

describe("Provider Pact Verification", () => {
  test(
    "validates all consumer expectations",
    async () => {
      const verifier = new Verifier({
        providerBaseUrl: "http://localhost:3000",
        pactUrls: [path.resolve(process.cwd(), "../pacts/TodoConsumer-TodoProvider.json")],
        stateHandlers: {
          "todos exist": async () => true,
          "single todo exists": async () => true,
          "users exist": async () => true,
          "no todos": async () => true,
        }
      });

      const result = await verifier.verifyProvider();
      console.log("Pact Verification Complete:", result);
    },
    20000
  );
});
