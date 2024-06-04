const avaliacaoModel = require('../models/avaliacaoModel')

const index = async (request, response) => {
  try {
    const avaliacoes = await avaliacaoModel.index()
    return response.status(200).json(avaliacoes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const show = async (request, response) => {
  const AvaliacaoID = request.params.AvaliacaoID
  if (!AvaliacaoID) {
    return response.status(400).json({ message: 'AvaliacaoID é obrigatório' })
  }
  try {
    const avaliacao = await avaliacaoModel.show(AvaliacaoID)
    if (!avaliacao) {
      return response.status(404).json({ message: 'Avaliação não encontrada' })
    }
    return response.status(200).json(avaliacao)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const store = async (request, response) => {
  const { MoradorID, Descricao, Nota, ServicoID } = request.body
  if (!MoradorID || !Descricao || !Nota || !ServicoID ) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }
  try {
    const modelRes = await avaliacaoModel.store(request.body)
    return response.status(201).json(modelRes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}


const destroy = async (request, response) => {
  const { AvaliacaoID } = request.body
  if (!AvaliacaoID) {
    return response.status(400).json({ message: 'AvaliacaoID é obrigatório' })
  }
  try {
    const modelRes = await avaliacaoModel.destroy(AvaliacaoID)
    if (modelRes.message === 'Avaliação excluída com sucesso.') {
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
  destroy
}
