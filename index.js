const express = require("express");
const UsuarioController = require("./back-end/controllers/UsuarioController");
const usuarioRoutes = require("./back-end/routes/UsuarioRoute");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Está funcionando!");
});

app.use("/usuarios", usuarioRoutes);

app.get("/areaLogada", UsuarioController.verificarAutenticacao, (req, res) => {
  res.json({
    msg: `Você está logado com o ID ${req.usuarioId} e pode acessar este recurso.`,
  });
});

app.listen(8000, () => {
  console.log("Servidor rodando em http://localhost:8000");
});
