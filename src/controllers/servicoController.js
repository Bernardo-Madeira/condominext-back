const servicoModel = require('../models/servicoModel');

const index = async (request, response) => {
  const {PrestadorID} = request.body
  if (!PrestadorID) {
    return response.status(400).json({ message: 'PrestadorID é obrigatório' });
  }
  try {
    const servicos = await servicoModel.index(PrestadorID);
    return response.status(200).json(servicos);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const show = async (request, response) => {
  const ServicoID = request.params.ServicoID;
  if (!ServicoID) {
    return response.status(400).json({ message: 'ServicoID é obrigatório' });
  }
  try {
    const servico = await servicoModel.show(ServicoID);
    if (!servico.servico) {
      return response.status(404).json({ message: 'Serviço não encontrado' });
    }
    return response.status(200).json(servico);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const store = async (request, response) => {
  const { PrestadorID, Nome, Categoria } = request.body;
  if (!PrestadorID || !Nome || !Categoria) {
    return response.status(400).json({ message: 'PrestadorID, Nome e Categoria são obrigatórios' });
  }
  try {
    const modelRes = await servicoModel.store(request.body);
    return response.status(201).json(modelRes);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const update = async (request, response) => {
  const { ServicoID, Nome, Descricao, Categoria } = request.body;
  if (!ServicoID || !Nome || !Descricao || !Categoria) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
  try {
    const modelRes = await servicoModel.update(request.body);
    if (modelRes.message === 'Serviço atualizado com sucesso.') {
      return response.status(202).json(modelRes);
    }
    return response.status(400).json(modelRes);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const destroy = async (request, response) => {
  const { ServicoID } = request.body;
  if (!ServicoID) {
    return response.status(400).json({ message: 'ServicoID é obrigatório' });
  }
  try {
    const modelRes = await servicoModel.destroy(ServicoID);
    if (modelRes.message === 'Serviço excluído com sucesso.') {
      return response.status(202).json(modelRes);
    }
    return response.status(400).json(modelRes);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const getAllServicos = async (request, response) => {
  try {
    const servicos = await servicoModel.getAllServicos();
    return response.status(200).json(servicos);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getAllServicos
};
