// prestadorModel.js

const connection = require('./connection');

const index = async () => {
  try {
    const [prestadores] = await connection.execute('SELECT * FROM fornecedores');
    return prestadores;
  } catch (error) {
    return { message: error.message };
  }
};

const solicitacoes = async () => {
  try {
    const [prestadores] = await connection.execute('SELECT * FROM fornecedores WHERE Verificado = 0');
    return prestadores;
  } catch (error) {
    return { message: error.message };
  }
};

const show = async (PrestadorID) => {
  try {
    const [prestador] = await connection.execute('SELECT * FROM fornecedores WHERE PrestadorID = ?', [PrestadorID]);
    return prestador[0];
  } catch (error) {
    return { message: error.message };
  }
};

const store = async (body) => {
  const { Email, Senha, Telefone, Usuario } = body;

  try {
    const [result] = await connection.execute(
      `INSERT INTO fornecedores (Email, Senha, Telefone, Usuario, Verificado) VALUES (?, ?, ?, ?, ?)`,
      [Email, Senha, Telefone, Usuario, 0]
    );
    return { PrestadorID: result.insertId };
  } catch (error) {
    return { message: error.message };
  }
};

const update = async (body) => {
  const { PrestadorID, Email, Senha, Telefone, Usuario, Verificado } = body;

  try {
    await connection.execute(
      `UPDATE fornecedores SET Email = ?, Senha = ?, Telefone = ?, Usuario = ?, Verificado = ? WHERE PrestadorID = ?`,
      [Email, Senha, Telefone, Usuario, Verificado, PrestadorID]
    );
    return { message: 'Prestador atualizado com sucesso.' };
  } catch (error) {
    return { message: error.message };
  }
};

const destroy = async (PrestadorID) => {
  try {
    await connection.execute('DELETE FROM fornecedores WHERE PrestadorID = ?', [PrestadorID]);
    return { message: 'Prestador excluído com sucesso.' };
  } catch (error) {
    return { message: error.message };
  }
};

const getPedidos = async (PrestadorID) => {
  try {
    const query = `
      SELECT
        pedidos.PedidoID,
        pedidos.ServicoID,
        pedidos.Estado,
        pedidos.DataPedido,
        pedidos.MoradorID,
        pedidos.AvaliacaoID,
        servicos.Nome AS ServicoNome,
        servicos.Descricao AS ServicoDescricao,
        servicos.Categoria AS ServicoCategoria,
        servicos.Media AS ServicoMedia,
        moradores.Email AS MoradorEmail,
        moradores.Telefone AS MoradorTelefone
      FROM
        pedidos
      INNER JOIN
        servicos ON pedidos.ServicoID = servicos.ServicoID
      INNER JOIN
        fornecedores ON servicos.PrestadorID = fornecedores.PrestadorID
      INNER JOIN
        moradores ON pedidos.MoradorID = moradores.MoradorID
      WHERE
        fornecedores.PrestadorID = ?
    `;
    const [pedidos] = await connection.execute(query, [PrestadorID]);
    return pedidos;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  solicitacoes,
  getPedidos
};
