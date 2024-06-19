const connection = require('./connection');

const index = async () => {
  try {
    const [administradores] = await connection.execute('SELECT * FROM administradores');
    return administradores;
  } catch (error) {
    throw new Error(error.message);
  }
};

const show = async (id) => {
  try {
    const [administrador] = await connection.execute('SELECT * FROM administradores WHERE id = ?', [id]);
    return administrador[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const store = async ({ Email, Senha, Telefone, NickAdministrador }) => {
  try {
    const [result] = await connection.execute(
      'INSERT INTO administradores (Email, Senha, Telefone, NickAdministrador) VALUES (?, ?, ?, ?)',
      [Email, Senha, Telefone, NickAdministrador]
    );
    return { id: result.insertId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async ({ id, Email, Senha, Telefone, NickAdministrador }) => {
  try {
    await connection.execute(
      'UPDATE administradores SET Email = ?, Senha = ?, Telefone = ?, NickAdministrador = ? WHERE id = ?',
      [Email, Senha, Telefone, NickAdministrador, id]
    );
    return { message: 'Administrador atualizado com sucesso.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

const destroy = async (id) => {
  try {
    await connection.execute('DELETE FROM administradores WHERE id = ?', [id]);
    return { message: 'Administrador excluído com sucesso.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { index, show, store, update, destroy };
