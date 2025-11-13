import fetch from 'node-fetch';

export async function getTodos(baseUrl) {
  const res = await fetch(`${baseUrl}/todos`);
  return res.json();
}

//https://meowfacts.herokuapp.com/
const DEFAULT_URL = 'https://meowfacts.herokuapp.com';

export async function getFacts(baseUrl = DEFAULT_URL) {
  const res = await fetch(`${baseUrl}/`);
  return res.json();
}


// getFacts('https://meowfacts.herokuapp.com/')
//   .then(data => console.log(data)).catch(err => console.error(err));