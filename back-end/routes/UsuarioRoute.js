const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

// Rota de cadastro de usuário
router.post("/auth/cadastro", UsuarioController.cadastrar);

// Rota de login
router.post("/auth/login", UsuarioController.login);

// Rota protegida: listar usuários (somente admin)
router.get(
  "/auth/listar",
  UsuarioController.verificarAutenticacao,
  UsuarioController.verificaIsAdmin,
  UsuarioController.listarUsuarios
);

module.exports = router;
