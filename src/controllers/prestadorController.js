// prestadorController.js

const prestadorModel = require('../models/prestadorModel');

const index = async (req, res) => {
  try {
    const prestadores = await prestadorModel.index();
    return res.status(200).json(prestadores);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  const PrestadorID = req.params.PrestadorID;

  if (!PrestadorID) {
    return res.status(400).json({ message: 'PrestadorID is required' });
  }

  try {
    const prestador = await prestadorModel.show(PrestadorID);
    if (!prestador) {
      return res.status(404).json({ message: 'Prestador não encontrado' });
    }
    return res.status(200).json(prestador);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  const { Email, Senha, Telefone, Usuario } = req.body;

  if (!Email || !Senha || !Telefone || !Usuario) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const modelRes = await prestadorModel.store(req.body);
    if (modelRes.PrestadorID) {
      return res.status(201).json(modelRes);
    }
    return res.status(400).json({message: "Email já cadastrado"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { PrestadorID, Email, Senha, Telefone, Usuario, Verificado } = req.body;

  if (!PrestadorID || !Email || !Senha || !Telefone || !Usuario || Verificado === undefined) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const modelRes = await prestadorModel.update(req.body);
    if (modelRes.message === 'Prestador atualizado com sucesso.') {
      return res.status(202).json(modelRes);
    }
    return res.status(400).json(modelRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  const { PrestadorID } = req.body;

  if (!PrestadorID) {
    return res.status(400).json({ message: 'PrestadorID is required' });
  }

  try {
    const modelRes = await prestadorModel.destroy(PrestadorID);
    if (modelRes.message === 'Prestador excluído com sucesso.') {
      return res.status(202).json(modelRes);
    }
    return res.status(400).json(modelRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const solicitacoes = async (req, res) => {


  try {
    const modelRes = await prestadorModel.solicitacoes();
    if (modelRes) {
      return res.status(202).json(modelRes);
    }
    return res.status(400).json(modelRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPedidos = async (req, res) => {
  const PrestadorID = req.params.PrestadorID;

  if (!PrestadorID) {
    return res.status(400).json({ message: 'PrestadorID is required' });
  }

  try {
    const pedidos = await prestadorModel.getPedidos(PrestadorID);
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  solicitacoes,
  getPedidos
};
