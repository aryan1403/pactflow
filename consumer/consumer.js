import fetch from 'node-fetch';

export async function getTodos(baseUrl) {
  const res = await fetch(`${baseUrl}/todos`);
  return res.json();
}