const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class UsuarioController {

  // Cadastro de usuário
  static async cadastrar(req, res) {
    try {
      const { nome, email, password, tipo } = req.body;

      // Verifica se já existe usuário com o mesmo e-mail
      const usuarioExistente = await client.usuario.findUnique({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ msg: "E-mail já cadastrado!" });
      }

      const salt = bcryptjs.genSaltSync(8);
      const hashSenha = bcryptjs.hashSync(password, salt);

      const usuario = await client.usuario.create({
        data: { nome, email, password: hashSenha, tipo },
      });

      return res.status(201).json({ usuarioId: usuario.id });
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao cadastrar usuário", erro: error.message });
    }
  }

  // Login de usuário
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const usuario = await client.usuario.findUnique({ where: { email } });
      if (!usuario) return res.status(404).json({ msg: "Usuário não encontrado!" });

      const senhaCorreta = bcryptjs.compareSync(password, usuario.password);
      if (!senhaCorreta) return res.status(401).json({ msg: "Senha incorreta!" });

      const token = jwt.sign(
        { id: usuario.id },
        process.env.SENHA_SERVIDOR,
        { expiresIn: "2h" }
      );

      return res.status(200).json({ msg: "Autenticado!", token });
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao realizar login", erro: error.message });
    }
  }

  // Middleware de autenticação
  static async verificarAutenticacao(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ msg: "Token não encontrado" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload) => {
      if (err) return res.status(401).json({ msg: "Token inválido!" });
      req.usuarioId = payload.id;
      next();
    });
  }

  // Middleware para checar se é admin
  static async verificaIsAdmin(req, res, next) {
    if (!req.usuarioId) return res.status(401).json({ msg: "Você não está autenticado" });

    const usuario = await client.usuario.findUnique({ where: { id: req.usuarioId } });
    if (!usuario) return res.status(404).json({ msg: "Usuário não encontrado" });
    if (usuario.tipo !== "admin") return res.status(403).json({ msg: "Acesso negado, você não é um administrador" });

    next();
  }

  // Listar todos os usuários (somente admin)
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await client.usuario.findMany();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao listar usuários", erro: error.message });
    }
  }
}

module.exports = UsuarioController;
