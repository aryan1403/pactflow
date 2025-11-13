import path from "path";
import { PactV3 } from "@pact-foundation/pact";
import { getTodos } from "./consumer.js";

const provider = new PactV3({
  consumer: "TodoConsumer",
  provider: "TodoProvider",
  dir: path.resolve(process.cwd(), "../provider/pacts"), // 👈 THIS PATH IS IMPORTANT
});



describe("TodoApp consumer tests (Pact)", () => {
  test("GET /todos", async () => {
    provider.addInteraction({
      states: [{ description: "todos exist" }],
      uponReceiving: "a request for todos",
      withRequest: {
        method: "GET",
        path: "/todos",
      },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: [{ id: 1, title: "Buy milk" }],
      },
    });

    await provider.executeTest(async (mockServer) => {
      const todos = await getTodos(mockServer.url);
      expect(todos).toEqual([{ id: 1, title: "Buy milk" }]);
    });
  });
});