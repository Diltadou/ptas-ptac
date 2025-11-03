const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

// Cadastro
router.post("/auth/cadastro", UsuarioController.cadastrar);

// Login
router.post("/auth/login", UsuarioController.login);

// Listar usuários (apenas admin)
router.get(
  "/auth/listar",
  UsuarioController.verificarAutenticacao,
  UsuarioController.verificaIsAdmin,
  UsuarioController.listarUsuarios
);

module.exports = router;
