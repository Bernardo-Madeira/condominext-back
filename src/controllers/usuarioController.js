const usuarioModel = require('../models/usuarioModel')

const index = async (request, response) => {
  try {
    const usuarios = await usuarioModel.index()
    return response.status(200).json(usuarios)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const show = async (request, response) => {
  const UsuarioID = request.params.UsuarioID
  if (!UsuarioID) {
    return response.status(400).json({ message: 'UsuarioID is required' })
  }
  try {
    const usuario = await usuarioModel.show(UsuarioID)
    if (!usuario) {
      return response.status(404).json({ message: 'Usuário não encontrado' })
    }
    return response.status(200).json(usuario)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const store = async (request, response) => {
  const { Email, Senha, Telefone, Permissao, Bloco, Apartamento, CondominioID } = request.body
  if (!Email || !Senha || !Telefone || !Permissao || !Bloco || !Apartamento, !CondominioID) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }
  try {
    const modelRes = await usuarioModel.store(request.body)
    if (modelRes.UsuarioID) {
      return response.status(201).json(modelRes)
    }
    return response.status(400).json(modelRes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const update = async (request, response) => {
  const { UsuarioID, Email, Senha, Telefone, Permissao, Bloco, Apartamento } = request.body
  if (!UsuarioID || !Email || !Senha || !Telefone || !Permissao || !Bloco || !Apartamento) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }
  try {
    const modelRes = await usuarioModel.update(request.body)
    if (modelRes.message === 'Usuário atualizado com sucesso.') {
      return response.status(202).json(modelRes)
    }
    return response.status(400).json(modelRes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const destroy = async (request, response) => {
  const { UsuarioID } = request.body
  if (!UsuarioID) {
    return response.status(400).json({ message: 'UsuarioID is required' })
  }
  try {
    const modelRes = await usuarioModel.destroy(UsuarioID)
    if (modelRes.message === 'Usuário excluído com sucesso.') {
      return response.status(202).json(modelRes)
    }
    return response.status(400).json(modelRes)
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const loginUsuario = async (req, res) => {
  const { Email, Senha } = req.body;

  if (!Email || !Senha) {
    return res.status(400).json({ message: 'Email e Senha são obrigatórios' });
  }

  try {
    const usuario = await usuarioModel.loginUsuario(req.body);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(usuario);
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
  loginUsuario
}
