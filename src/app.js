const express = require('express');
const router = require('./router');

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Usando o router no caminho base
app.use(router);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

module.exports = app;
