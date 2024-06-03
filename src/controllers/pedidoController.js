const pedidoModel = require('../models/pedidoModel')

const index = async (request, response) => {
  try {
    const pedidos = await pedidoModel.index()
    return response.status(200).json(pedidos)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const show = async (request, response) => {
  const PedidoID = request.params.PedidoID
  if (!PedidoID) {
    return response.status(400).json({ message: 'PedidoID é obrigatório' })
  }
  try {
    const pedido = await pedidoModel.show(PedidoID)
    if (!pedido) {
      return response.status(404).json({ message: 'Pedido não encontrado' })
    }
    return response.status(200).json(pedido)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const store = async (request, response) => {
  const { ServicoID, MoradorID, Descricao } = request.body
  if (!ServicoID || !MoradorID || !Descricao) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }
  try {
    const modelRes = await pedidoModel.store(request.body)
    return response.status(201).json(modelRes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const update = async (request, response) => {
  const { PedidoID, Status } = request.body
  if (!PedidoID || !Status) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }
  try {
    const modelRes = await pedidoModel.update(request.body)
    if (modelRes.message === 'Pedido atualizado com sucesso.') {
      return response.status(202).json(modelRes)
    }
    return response.status(400).json(modelRes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const destroy = async (request, response) => {
  const { PedidoID } = request.body
  if (!PedidoID) {
    return response.status(400).json({ message: 'PedidoID é obrigatório' })
  }
  try {
    const modelRes = await pedidoModel.destroy(PedidoID)
    if (modelRes.message === 'Pedido excluído com sucesso.') {
      return response.status(202).json(modelRes)
    }
    return response.status(400).json(modelRes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
