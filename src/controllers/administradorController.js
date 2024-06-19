const administradorModel = require('../models/administradorModel');

const index = async (req, res) => {
  try {
    const administradores = await administradorModel.index();
    res.status(200).json(administradores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const administrador = await administradorModel.show(id);
    if (!administrador) {
      return res.status(404).json({ message: 'Administrador não encontrado.' });
    }
    res.status(200).json(administrador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  const { Email, Senha, Telefone, NickAdministrador } = req.body;
  try {
    const result = await administradorModel.store({ Email, Senha, Telefone, NickAdministrador });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { Email, Senha, Telefone, NickAdministrador } = req.body;
  try {
    await administradorModel.update({ id, Email, Senha, Telefone, NickAdministrador });
    res.status(200).json({ message: 'Administrador atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await administradorModel.destroy(id);
    res.status(200).json({ message: 'Administrador excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { index, show, store, update, destroy };
