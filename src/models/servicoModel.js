const connection = require('./connection');

const index = async (PrestadorID) => {
  try {
    const query = 'SELECT * FROM servicos WHERE PrestadorID = ?';
    const [results] = await connection.execute(query, [PrestadorID]);
    return results;
  } catch (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }
}


const show = async (ServicoID) => {
  try {
    const [servico] = await connection.execute('SELECT * FROM servicos WHERE ServicoID = ?', [ServicoID]);
    const [prestador] = await connection.execute('SELECT * FROM fornecedores WHERE PrestadorID = ?', [servico[0].PrestadorID]);
    const [avaliacoes] = await connection.execute(`
      SELECT avaliacoes.*, moradores.Usuario, moradores.bloco, moradores.apartamento
      FROM avaliacoes 
      JOIN pedidos ON avaliacoes.PedidoID = pedidos.PedidoID 
      JOIN servicos ON pedidos.ServicoID = servicos.ServicoID 
      JOIN moradores ON avaliacoes.MoradorID = moradores.MoradorID 
      WHERE servicos.ServicoID = ?
    `, [ServicoID]);

    return {
      servico: servico[0],
      prestador: prestador[0],
      avaliacoes: avaliacoes.map(avaliacao => ({
        AvaliacaoID: avaliacao.AvaliacaoID,
        PedidoID: avaliacao.PedidoID,
        MoradorID: avaliacao.MoradorID,
        Nota: avaliacao.Nota,
        Descricao: avaliacao.Descricao,
        Usuario: avaliacao.Usuario,
      }))
    };
  } catch (error) {
    throw new Error(error.message);
  }
};



const store = async (body) => {
  const { PrestadorID, Nome, Descricao, Categoria } = body;
  try {
    const [result] = await connection.execute(
      'INSERT INTO servicos (PrestadorID, Nome, Descricao, Categoria, Media) VALUES (?, ?, ?, ?, ?)',
      [PrestadorID, Nome, Descricao , Categoria, 0]
    );
    return { ServicoID: result.insertId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (body) => {
  const { ServicoID, Nome, Descricao, Categoria } = body;
  try {
    await connection.execute(
      'UPDATE servicos SET Nome = ?, Descricao = ?, Categoria = ? WHERE ServicoID = ?',
      [Nome, Descricao, Categoria, ServicoID]
    );
    return { message: 'Serviço atualizado com sucesso.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

const destroy = async (ServicoID) => {
  try {
    await connection.execute('DELETE FROM servicos WHERE ServicoID = ?', [ServicoID]);
    return { message: 'Serviço excluído com sucesso.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllServicos = async () => {
  try {
    const query = 'SELECT * FROM servicos';
    const [results] = await connection.execute(query);
    return results;
  } catch (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }
}


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getAllServicos
};
