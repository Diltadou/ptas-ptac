const request = require("supertest");
const app = require("./app");
// ... (testes anteriores)
test("POST /soma soma corretamente", async () => {
 const res = await request(app)
 .post("/soma")
 .send({ a: 2, b: 3 }); // Envia o corpo da requisição
 expect(res.status).toBe(200);
 expect(res.body.resultado).toBe(5);
});