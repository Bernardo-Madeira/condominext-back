const connection = require('./connection')

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

    // Verifica na tabela moradores
    [usuario] = await connection.execute(
      'SELECT * FROM moradores WHERE Email = ? AND Senha = ?',
      [Email, Senha]
    );
    if (usuario.length > 0) {
      const morador = usuario[0];

      // Verifica se o morador também é um prestador na tabela fornecedores
      [usuario] = await connection.execute(
        'SELECT * FROM fornecedores WHERE Email = ? AND Senha = ?',
        [Email, Senha]
      );

      if (usuario.length > 0) {
        // Se for um prestador, adiciona o PrestadorID ao objeto morador
        morador.PrestadorID = usuario[0].PrestadorID;
      }

      const [pedidosConcluidos] = await connection.execute(
        'SELECT * FROM pedidos WHERE MoradorID = ? AND Estado = "concluido" AND AvaliacaoID IS NULL',
        [morador.MoradorID]
      )

      const avaliacaoPendente = pedidosConcluidos.length

      // Retorna o morador com ou sem o PrestadorID
      return { tipo: 'morador', usuario: morador, avaliacaoPendente }

      // Retorna o morador com ou sem o PrestadorID
      return { tipo: 'morador', usuario: morador, avaliacaoPendente: true };
    }

    // Verifica na tabela fornecedores
    [usuario] = await connection.execute(
      'SELECT * FROM fornecedores WHERE Email = ? AND Senha = ?',
      [Email, Senha]
    );
    if (usuario.length > 0) {
      return { tipo: 'prestador', usuario: usuario[0] };
    }

    // Se não encontrou em nenhuma tabela
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = { login }
