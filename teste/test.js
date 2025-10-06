const request = require("supertest"); // supertest
const app = require("../back-end/app"); // app Express
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

// Limpa o banco antes dos testes (opcional)
beforeAll(async () => {
  await client.usuario.deleteMany();
});

afterAll(async () => {
  await client.$disconnect();
});

describe("Testes de integração - Rotas de autenticação e cadastro", () => {

  test("POST /auth/cadastro deve cadastrar um novo usuário com sucesso", async () => {
    const res = await request(app)
      .post("/auth/cadastro")
      .send({
        nome: "João Teste",
        email: "joao@teste.com",
        password: "123456",
        tipo: "usuario"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("usuarioId");
  });

  test("POST /auth/cadastro deve retornar erro se o e-mail já existir", async () => {
    const res = await request(app)
      .post("/auth/cadastro")
      .send({
        nome: "João Teste",
        email: "joao@teste.com",
        password: "123456",
        tipo: "usuario"
      });

    expect(res.statusCode).toBe(500); // Prisma lança erro de chave única
  });

  test("POST /auth/login deve autenticar usuário válido e retornar token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "joao@teste.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.msg).toBe("Autenticado!");
  });

  test("POST /auth/login deve falhar se o usuário não existir", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "naoexiste@teste.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Usuário não encontrado!");
  });

  test("POST /auth/login deve falhar se a senha estiver incorreta", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "joao@teste.com",
        password: "senhaerrada"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("Senha incorreta!");
  });
});
