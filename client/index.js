async function register() {
  fetch("http://localhost:3000/auth/register", {
    body: JSON.stringify({
      email: "teste1234@gmail.com",
      password: "my-password",
      username: "Pedro Fofo",
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((resp) => console.log(resp));
}
