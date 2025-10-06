const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas de teste
app.get("/hello", (req, res) => res.json({ msg: "Hello World" }));

app.post("/soma", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ erro: "Parâmetros inválidos. Use números." });
  }
  res.json({ resultado: a + b });
});

// Rotas de usuários
const UsuariosRoutes = require("./routes/UsuarioRoute"); // ajuste o caminho se necessário
app.use("/usuarios", UsuariosRoutes); // prefixo "/usuarios"

// **Não chamar app.listen aqui**, exporta apenas o app
module.exports = app;
