const router = require("express").Router();

const UsuarioController = require("../controllers/UsuarioController");

router.post("/cadastro", UsuarioController.cadastrar);

router.post("/login", UsuarioController.login);

router.get(
  "/listar",
  UsuarioController.verificarAutenticacao,
  UsuarioController.verificaIsAdmin,
  UsuarioController.listarUsuarios
);

module.exports = router;