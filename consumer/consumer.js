import fetch from "node-fetch";

export async function getTodos(baseUrl) {
  return (await fetch(`${baseUrl}/todos`)).json();
}

export async function getTodo(baseUrl, id) {
  return (await fetch(`${baseUrl}/todos/${id}`)).json();
}

export async function createTodo(baseUrl, title) {
  const res = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function updateTodo(baseUrl, id, title) {
  const res = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteTodo(baseUrl, id) {
  return (await fetch(`${baseUrl}/todos/${id}`, { method: "DELETE" })).json();
}

export async function getFacts(baseUrl) {
  return (await fetch(`${baseUrl}/facts`)).json();
}

export async function health(baseUrl) {
  return (await fetch(`${baseUrl}/health`)).json();
}

export async function stats(baseUrl) {
  return (await fetch(`${baseUrl}/stats`)).json();
}

export async function getUsers(baseUrl) {
  return (await fetch(`${baseUrl}/users`)).json();
}

export async function getUser(baseUrl, id) {
  return (await fetch(`${baseUrl}/users/${id}`)).json();
}
