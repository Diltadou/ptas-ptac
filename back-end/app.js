const express = require("express");
const app = express();

// Middleware para parsear JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota básica para teste
app.get("/hello", (req, res) => {
  res.json({ msg: "Hello World" });
});

// Rota de soma para testes com POST
app.post("/soma", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ erro: "Parâmetros inválidos. Use números." });
  }
  res.json({ resultado: a + b });
});

// Rotas dos usuários
const UsuariosRoutes = require("./routes/UsuarioRoute.js");
app.use("/usuarios", UsuariosRoutes);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
