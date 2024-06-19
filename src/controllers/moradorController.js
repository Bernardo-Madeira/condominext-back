const moradorModel = require('../models/moradorModel');

const index = async (request, response) => {
  try {
    const moradores = await moradorModel.index();
    return response.status(200).json(moradores);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

const show = async (request, response) => {
  const MoradorID = request.params.MoradorID;
  if (!MoradorID) {
    return response.status(400).json({ message: 'MoradorID is required' });
  }
  try {
    const morador = await moradorModel.show(MoradorID);
    if (!morador) {
      return response.status(404).json({ message: 'Morador não encontrado' });
    }
    return response.status(200).json(morador);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

const store = async (request, response) => {
  const { Email, Telefone, Senha, Usuario, Bloco, Apartamento } = request.body;
  if (!Email || !Telefone || !Senha || !Usuario || !Bloco || !Apartamento) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
  try {
    const modelRes = await moradorModel.store(request.body);
    if (modelRes.MoradorID) {
      return response.status(201).json(modelRes);
    }
    return response.status(400).json(modelRes);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

const update = async (request, response) => {
  const { MoradorID, Email, Telefone, Senha, Usuario, Bloco, Apartamento } = request.body;
  if (!MoradorID || !Email || !Telefone || !Senha || !Usuario || !Bloco || !Apartamento) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
  try {
    const modelRes = await moradorModel.update(request.body);
    if (modelRes.message === 'Morador atualizado com sucesso.') {
      return response.status(202).json(modelRes);
    }
    return response.status(400).json(modelRes);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

const destroy = async (request, response) => {
  const { MoradorID } = request.body;
  if (!MoradorID) {
    return response.status(400).json({ message: 'MoradorID is required' });
  }
  try {
    const modelRes = await moradorModel.destroy(MoradorID);
    if (modelRes.message === 'Morador excluído com sucesso.') {
      return response.status(202).json(modelRes);
    }
    return response.status(400).json(modelRes);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
}
