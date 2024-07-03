const geralModel = require('../models/geralModel');

const login = async (req, res) => {
  const { Email, Senha } = req.body;

  try {
    const usuario = await geralModel.login({ Email, Senha });

    if (!usuario) {
      return res.status(404).json({ message: 'Credenciais inválidas.' });
    }

    switch (usuario.tipo) {
      case 'administrador':
        return res.status(200).json({ tipo: 'administrador', usuario: usuario.usuario });
      case 'prestador':
        return res.status(200).json({ tipo: 'prestador', usuario: usuario.usuario });
      case 'morador':
        return res.status(200).json({ tipo: 'morador', usuario: usuario.usuario, avaliacaoPendente: usuario.avaliacaoPendente });
      default:
        return res.status(404).json({ message: 'Tipo de usuário desconhecido.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
