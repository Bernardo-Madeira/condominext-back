const connection = require('./connection');

const index = async () => {
  try {
    const [moradores] = await connection.execute('SELECT * FROM moradores');
    return moradores;
  } catch (error) {
    return { message: error.message };
  }
}

const show = async (MoradorID) => {
  try {
    const [morador] = await connection.execute('SELECT * FROM moradores WHERE MoradorID = ?', [MoradorID]);
    return morador[0];
  } catch (error) {
    return { message: error.message };
  }
}

const store = async (body) => {
  const { Email, Telefone, Senha, Usuario, Bloco, Apartamento } = body;
  try {
    const [result] = await connection.execute(
      'INSERT INTO moradores (Email, Telefone, Senha, Usuario, Bloco, Apartamento) VALUES (?, ?, ?, ?, ?, ?)',
      [Email, Telefone, Senha, Usuario, Bloco, Apartamento]
    );
    return { MoradorID: result.insertId };
  } catch (error) {
    return { message: error.message };
  }
}

const update = async (body) => {
  const { MoradorID, Email, Telefone, Senha, Usuario, Bloco, Apartamento } = body;
  try {
    await connection.execute(
      'UPDATE moradores SET Email = ?, Telefone = ?, Senha = ?, Usuario = ?, Bloco = ?, Apartamento = ? WHERE MoradorID = ?',
      [Email, Telefone, Senha, Usuario, Bloco, Apartamento, MoradorID]
    );
    return { message: 'Morador atualizado com sucesso.' };
  } catch (error) {
    return { message: error.message };
  }
}

const destroy = async (MoradorID) => {
  try {
    await connection.execute('DELETE FROM moradores WHERE MoradorID = ?', [MoradorID]);
    return { message: 'Morador excluído com sucesso.' };
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
}
