const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas de teste simples
app.get("/hello", (req, res) => res.json({ msg: "Hello World" }));

app.post("/soma", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ erro: "Parâmetros inválidos. Use números." });
  }
  res.json({ resultado: a + b });
});

// Rotas de usuários
const UsuariosRoutes = require("./routes/UsuarioRoute");
app.use("/usuarios", UsuariosRoutes);

module.exports = app;
