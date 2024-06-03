const connection = require('./connection')

const index = async () => {
  try {
    const [servicos] = await connection.execute('SELECT * FROM servicos')
    return servicos
  } catch (error) {
    throw new Error(error.message)
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
