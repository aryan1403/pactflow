import path from "path";
import { PactV3 } from "@pact-foundation/pact";

import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getFacts,
  health,
  stats,
  getUsers,
  getUser,
} from "./consumer.js";

const provider = new PactV3({
  consumer: "TodoConsumer",
  provider: "TodoProvider",
  dir: path.resolve(process.cwd(), "../pacts"),
});

describe("Consumer Pact Tests - 10 endpoints", () => {

  test("GET /todos", async () => {
    provider.addInteraction({
      states: [{ description: "todos exist" }],
      uponReceiving: "request for all todos",
      withRequest: { method: "GET", path: "/todos" },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: [{ id: 1, title: "Buy milk" }],
      },
    });

    await provider.executeTest(async (mock) => {
      expect(await getTodos(mock.url)).toEqual([{ id: 1, title: "Buy milk" }]);
    });
  });

  test("GET /todos/:id", async () => {
    provider.addInteraction({
      states: [{ description: "single todo exists" }],
      uponReceiving: "request for single todo",
      withRequest: { method: "GET", path: "/todos/10" },
      willRespondWith: {
        status: 200,
        body: { id: 10, title: "Test todo" },
      },
    });

    await provider.executeTest(async (mock) => {
      expect(await getTodo(mock.url, 10)).toEqual({
        id: 10,
        title: "Test todo",
      });
    });
  });

  test("POST /todos", async () => {
    provider.addInteraction({
      uponReceiving: "create todo",
      withRequest: {
        method: "POST",
        path: "/todos",
        headers: { "Content-Type": "application/json" },
        body: { title: "New task" },
      },
      willRespondWith: {
        status: 201,
        body: { id: 123, title: "New task" },
      },
    });

    await provider.executeTest(async (mock) => {
      const todo = await createTodo(mock.url, "New task");
      expect(todo.title).toBe("New task");
    });
  });

  test("PUT /todos/:id", async () => {
    provider.addInteraction({
      states: [{ description: "single todo exists" }],
      uponReceiving: "update todo",
      withRequest: {
        method: "PUT",
        path: "/todos/10",
        headers: { "Content-Type": "application/json" },
        body: { title: "Updated" },
      },
      willRespondWith: {
        status: 200,
        body: { id: 10, title: "Updated" },
      },
    });

    await provider.executeTest(async (mock) => {
      const updated = await updateTodo(mock.url, 10, "Updated");
      expect(updated.title).toBe("Updated");
    });
  });

  test("DELETE /todos/:id", async () => {
    provider.addInteraction({
      states: [{ description: "single todo exists" }],
      uponReceiving: "delete todo",
      withRequest: { method: "DELETE", path: "/todos/10" },
      willRespondWith: {
        status: 200,
        body: { deleted: true },
      },
    });

    await provider.executeTest(async (mock) => {
      const res = await deleteTodo(mock.url, 10);
      expect(res.deleted).toBe(true);
    });
  });

  test("GET /facts", async () => {
    provider.addInteraction({
      given: "facts exist",
      uponReceiving: "get cat facts",
      withRequest: { method: "GET", path: "/facts" },
      willRespondWith: {
        status: 200,
        body: { data: ["Cats sleep 70%"] },
      },
    });

    await provider.executeTest(async (mock) => {
      expect(await getFacts(mock.url)).toEqual({ data: ["Cats sleep 70%"] });
    });
  });

  test("GET /health", async () => {
    provider.addInteraction({
      uponReceiving: "health check",
      withRequest: { method: "GET", path: "/health" },
      willRespondWith: { status: 200, body: { status: "ok" } },
    });

    await provider.executeTest(async (mock) => {
      expect(await health(mock.url)).toEqual({ status: "ok" });
    });
  });

  test("GET /stats", async () => {
    provider.addInteraction({
      states: [{ description: "todos exist" }],
      uponReceiving: "get stats",
      withRequest: { method: "GET", path: "/stats" },
      willRespondWith: { status: 200, body: { todoCount: 1 } },
    });

    await provider.executeTest(async (mock) => {
      expect(await stats(mock.url)).toEqual({ todoCount: 1 });
    });
  });

  test("GET /users", async () => {
    provider.addInteraction({
      states: [{ description: "users exist" }],
      uponReceiving: "get users",
      withRequest: { method: "GET", path: "/users" },
      willRespondWith: {
        status: 200,
        body: [{ id: 1, name: "John Doe" }],
      },
    });

    await provider.executeTest(async (mock) => {
      expect(await getUsers(mock.url)).toEqual([
        { id: 1, name: "John Doe" },
      ]);
    });
  });

  test("GET /users/:id", async () => {
    provider.addInteraction({
      states: [{ description: "users exist" }],
      uponReceiving: "get single user",
      withRequest: { method: "GET", path: "/users/1" },
      willRespondWith: {
        status: 200,
        body: { id: 1, name: "John Doe" },
      },
    });

    await provider.executeTest(async (mock) => {
      expect(await getUser(mock.url, 1)).toEqual({
        id: 1,
        name: "John Doe",
      });
    });
  });
});
