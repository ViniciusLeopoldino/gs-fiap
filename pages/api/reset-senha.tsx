import { getConnection } from './db';

import { NextApiRequest, NextApiResponse } from 'next';

const resetSenha = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    let connection;

    try {
      connection = await getConnection();

      const userResult = await connection.execute('SELECT * FROM cadastro WHERE email = :email', [email]);
      
      if (!userResult.rows || userResult.rows.length === 0) {
        return res.status(404).json({ message: 'E-mail não encontrado.' });
      }

      await connection.execute(
        'UPDATE cadastro SET senha = :senha, confsenha = :confsenha WHERE email = :email', 
        { senha: newPassword, confsenha: newPassword, email }
      );

      await connection.commit(); 

      return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      return res.status(500).json({ message: 'Erro ao atualizar a senha.' });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Erro ao fechar a conexão:', err);
        }
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default resetSenha;
