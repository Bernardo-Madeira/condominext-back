const connection = require('./connection')

const index = async () => {
  try {
    const [avaliacoes] = await connection.execute('SELECT * FROM avaliacoes')
    return avaliacoes
  } catch (error) {
    throw new Error(error.message)
  }
}

const show = async (AvaliacaoID) => {
  try {
    const [avaliacao] = await connection.execute('SELECT * FROM avaliacoes WHERE AvaliacaoID = ?', [AvaliacaoID])
    return avaliacao[0]
  } catch (error) {
    throw new Error(error.message)
  }
}

const store = async (body) => {
  const { MoradorID, Descricao, Nota, PedidoID } = body
  try {
    const [result] = await connection.execute(
      'INSERT INTO avaliacoes (MoradorID, Descricao, Nota, PedidoID) VALUES (?, ?, ?, ?)',
      [MoradorID, Descricao, Nota, PedidoID]
    )

    const AvaliacaoID = result.insertId

    // Agora vamos atualizar o PedidoID com o AvaliacaoID na tabela pedidos
    await connection.execute(
      'UPDATE pedidos SET AvaliacaoID = ? WHERE PedidoID = ?',
      [AvaliacaoID, PedidoID]
    )

    return { AvaliacaoID }
  } catch (error) {
    throw new Error(error.message)
  }
}


const destroy = async (AvaliacaoID) => {
  try {
    await connection.execute('DELETE FROM avaliacoes WHERE AvaliacaoID = ?', [AvaliacaoID])
    return { message: 'Avaliação excluída com sucesso.' }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  index,
  show,
  store,
  destroy
}
