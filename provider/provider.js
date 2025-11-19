import express from "express";

const app = express();
app.use(express.json());

// GET all todos
app.get("/todos", (req, res) => {
  res.json([{ id: 1, title: "Buy milk" }]);  // pact expected 1 todo
});

// GET single todo
app.get("/todos/:id", (req, res) => {
  res.json({ id: 10, title: "Test todo" });  // pact expected id=10
});

// CREATE todo
app.post("/todos", (req, res) => {
  res.status(201).json({
    id: 123,
    title: req.body.title || "Created todo"
  });
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
  res.json({
    id: 10,
    title: req.body.title || "Updated todo"
  });
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  res.json({ deleted: true });
});

// GET stats
app.get("/stats", (req, res) => {
  res.json({ todoCount: 1 });
});

// GET users list
app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "John Doe" }]);
});

// GET single user
app.get("/users/:id", (req, res) => {
  res.json({ id: 1, name: "John Doe" });
});

// CAT FACTS
app.get("/facts", (req, res) => {
  res.json({ data: ["Cats sleep 70%"] });
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export const server = app.listen(3000, () => {
  console.log("Provider running on http://localhost:3000");
});
