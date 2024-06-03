const connection = require('./connection')

const index = async () => {
  try {
    const [pedidos] = await connection.execute('SELECT * FROM pedidos')
    return pedidos
  } catch (error) {
    throw new Error(error.message)
  }
}

const show = async (PedidoID) => {
  try {
    const [pedido] = await connection.execute('SELECT * FROM pedidos WHERE PedidoID = ?', [PedidoID])
    return pedido[0]
  } catch (error) {
    throw new Error(error.message)
  }
}

const store = async (body) => {
  const { ServicoID, MoradorID, Descricao } = body
  const data = new Date()
  try {
    const [result] = await connection.execute(
      'INSERT INTO pedidos (ServicoID, MoradorID, Status, Descricao, DataRegistro, DataAtualizacao) VALUES (?, ?, ?, ?, ?, ?)',
      [ServicoID, MoradorID, "Pendente", Descricao, data, data]
    )
    return { PedidoID: result.insertId }
  } catch (error) {
    throw new Error(error.message)
  }
}

const update = async (body) => {
  const { PedidoID, Status } = body
  try {
    await connection.execute(
      'UPDATE pedidos SET Status = ?, DataAtualizacao = ? WHERE PedidoID = ?',
      [Status, new Date(), PedidoID]
    )
    return { message: 'Pedido atualizado com sucesso.' }
  } catch (error) {
    throw new Error(error.message)
  }
}

const destroy = async (PedidoID) => {
  try {
    await connection.execute('DELETE FROM pedidos WHERE PedidoID = ?', [PedidoID])
    return { message: 'Pedido excluído com sucesso.' }
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