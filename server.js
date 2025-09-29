

const express = require("express");
const dotenv = require("dotenv");
const usuarioRoutes = require("./back-end/routes/usuarioRoutes"); 

dotenv.config();
const app = express(); 

app.use(express.json());
app.use(usuarioRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}

module.exports = app;
