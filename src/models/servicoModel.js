const connection = require('./connection')

const index = async () => {
  try {
    const query = `
      SELECT 
        s.ServicoID,
        s.PrestadorID,
        s.Nome,
        s.Descricao,
        s.Categoria,
        s.DataCriacao,
        COUNT(a.AvaliacaoID) AS TotalAvaliacoes
      FROM 
        servicos s
      LEFT JOIN 
        avaliacoes a ON s.ServicoID = a.ServicoID
      GROUP BY 
        s.ServicoID, s.Nome
    `;
    const [results] = await connection.execute(query);
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
}


const show = async (ServicoID) => {
  try {
    const [servico] = await connection.execute('SELECT * FROM servicos WHERE ServicoID = ?', [ServicoID])
    return servico[0]
  } catch (error) {
    throw new Error(error.message)
  }
}

const store = async (body) => {
  const { PrestadorID, Nome, Descricao, Categoria } = body
  console.log(new Date())
  try {
    const [result] = await connection.execute(
      'INSERT INTO servicos (PrestadorID, Nome, Descricao, Categoria, DataCriacao) VALUES (?, ?, ?, ?, ?)',
      [PrestadorID, Nome, Descricao, Categoria, new Date()]
    )
    return { ServicoID: result.insertId }
  } catch (error) {
    throw new Error(error.message)
  }
}

const update = async (body) => {
  const { ServicoID, Nome, Descricao, Categoria } = body
  try {
    await connection.execute(
      'UPDATE servicos SET Nome = ?, Descricao = ?, Categoria = ? WHERE ServicoID = ?',
      [Nome, Descricao, Categoria, ServicoID]
    )
    return { message: 'Serviço atualizado com sucesso.' }
  } catch (error) {
    throw new Error(error.message)
  }
}

const destroy = async (ServicoID) => {
  try {
    await connection.execute('DELETE FROM servicos WHERE ServicoID = ?', [ServicoID])
    return { message: 'Serviço excluído com sucesso.' }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
