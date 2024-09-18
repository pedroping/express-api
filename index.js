const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8080;

app.listen(PORT, () => console.log("Server start on localhost:8080"));

app.get("/teste", (req, res) => {
  res.status(200).send({ teste: "Teste" });
});
