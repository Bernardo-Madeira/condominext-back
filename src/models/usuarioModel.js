const connection = require('./connection')

const index = async () => {
  try {
    const [users] = await connection.execute('SELECT * FROM usuarios')
    return users
  } catch (error) {
    return { message: error.message }
  }
}

const show = async (UsuarioID) => {
  try {
    const [user] = await connection.execute('SELECT * FROM usuarios WHERE UsuarioID = ?', [UsuarioID])
    return user[0]
  } catch (error) {
    return { message: error.message }
  }
}

const store = async (body) => {
  const { Email, Senha, Telefone, Permissao, Bloco, Apartamento, CondominioID } = body

  try {
    const [result] = await connection.execute(
      `INSERT INTO usuarios (Email, Senha, Telefone, Permissao, Bloco, Apartamento, CondominioID) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [Email, Senha, Telefone, Permissao, Bloco, Apartamento, CondominioID]
    )
    return { UsuarioID: result.insertId }
  } catch (error) {
    return { message: error.message }
  }
}

const update = async (body) => {
  const { Email, Senha, Telefone, Permissao, Bloco, Apartamento, UsuarioID } = body

  try {
    await connection.execute(
      `UPDATE usuarios SET Email = ?, Senha = ?, Telefone = ?, Permissao = ?, Bloco = ?, Apartamento = ? WHERE UsuarioID = ?`,
      [Email, Senha, Telefone, Permissao, Bloco, Apartamento, UsuarioID]
    )
    return { message: 'Usuário atualizado com sucesso.' }
  } catch (error) {
    return { message: error.message }
  }
}

const destroy = async (UsuarioID) => {
  try {
    await connection.execute('DELETE FROM usuarios WHERE UsuarioID = ?', [UsuarioID])
    return { message: 'Usuário excluído com sucesso.' }
  } catch (error) {
    return { message: error.message }
  }
}

const loginUsuario = async (body) => {
  try {
    const [user] = await connection.execute(
      'SELECT UsuarioID, Email, Telefone, Bloco, Apartamento, Permissao FROM usuarios WHERE Email = ? AND Senha = ?',
      [body.Email, body.Senha] // Passa os parâmetros corretamente
    );
    return user[0];
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = { loginUsuario };


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  loginUsuario
}
