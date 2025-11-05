import express from "express";

const app = express();
app.use(express.json());

app.get("/todos", (req, res) => {
  res.json([{ id: 1, title: "Buy milk" }]);
});

export const server = app.listen(3000, () => {
  console.log("Provider running on http://localhost:3000");
});
