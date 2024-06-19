const connection = require('./connection')

const index = async (body) => {
  const { MoradorID } = body;
  try {
    const [pedidos] = await connection.execute(`
      SELECT *
      FROM pedidos
      INNER JOIN servicos ON pedidos.ServicoID = servicos.ServicoID
      WHERE pedidos.MoradorID = ${MoradorID}
    `);
    return pedidos;
  } catch (error) {
    throw new Error(error.message);
  }
};


const show = async (PedidoID) => {
  try {
    const [pedido] = await connection.execute('SELECT * FROM pedidos WHERE PedidoID = ?', [PedidoID])
    return pedido[0]
  } catch (error) {
    throw new Error(error.message)
  }
}

const store = async (body) => {
  const { ServicoID, MoradorID } = body
  const data = new Date()
  try {
    const [result] = await connection.execute(
      'INSERT INTO pedidos (ServicoID, MoradorID, Estado, DataPedido) VALUES (?, ?, ?, ?)',
      [ServicoID, MoradorID, "Pendente", data]
    )
    return { PedidoID: result.insertId }
  } catch (error) {
    throw new Error(error.message)
  }
}

const update = async (body) => {
  const { PedidoID, Estado } = body
  try {
    await connection.execute(
      'UPDATE pedidos SET Estado = ? WHERE PedidoID = ?',
      [Estado, PedidoID]
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

const prestador = async (PrestadorID) => {
  try {
    const [pedidos] = await connection.execute(`
      SELECT pedidos.*
      FROM pedidos
      INNER JOIN servicos ON pedidos.ServicoID = servicos.ServicoID
      INNER JOIN usuarios ON servicos.PrestadorID = usuarios.UsuarioID
    `, [PrestadorID]);
    return pedidos;
  } catch (error) {
    throw new Error(error.message);
  }
}



module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  prestador
}
