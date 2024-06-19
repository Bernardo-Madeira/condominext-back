const connection = require('./connection');

const login = async ({ Email, Senha }) => {
  try {
    let usuario;
    // Verifica na tabela administradores
    [usuario] = await connection.execute(
      'SELECT * FROM administradores WHERE Email = ? AND Senha = ?',
      [Email, Senha]
    );
    if (usuario.length > 0) {
      return { tipo: 'administrador', usuario: usuario[0] };
    }

    // Verifica na tabela fornecedores
    [usuario] = await connection.execute(
      'SELECT * FROM fornecedores WHERE Email = ? AND Senha = ?',
      [Email, Senha]
    );
    if (usuario.length > 0) {
      return { tipo: 'prestador', usuario: usuario[0] };
    }

    // Verifica na tabela moradores
    [usuario] = await connection.execute(
      'SELECT * FROM moradores WHERE Email = ? AND Senha = ?',
      [Email, Senha]
    );
    if (usuario.length > 0) {
      return { tipo: 'morador', usuario: usuario[0] };
    }

    // Se não encontrou em nenhuma tabela
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { login };
