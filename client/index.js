const email = "teste1234@gmail.com";
const password = "my-password";
const username = "Pedro Fofo";

async function register() {
  fetch("http://localhost:3000/auth/register", {
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((r) => r.json())
    .then((resp) => console.log(resp));
}

async function login() {
  fetch("http://localhost:3000/auth", {
    body: JSON.stringify({
      email,
      password,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((r) => r.json())
    .then((resp) => console.log(resp));
}

async function getUsers() {
  fetch("http://localhost:3000/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((r) => r.json())
    .then((resp) => console.log(resp));
}
