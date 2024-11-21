import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from './db'; // Ajuste o caminho conforme necessário

const getUserData = async (email: string) => {
  const connection = await getConnection();
  console.log(`Buscando dados para o e-mail: ${email}`); // Log do e-mail que está sendo buscado
  const result = await connection.execute('SELECT * FROM cadastro WHERE email = :1', [email]);

  console.log(`Resultado da consulta:`, result.rows); // Log do resultado da consulta
  return result.rows ? result.rows[0] : null; // Retorna o primeiro usuário encontrado ou null se undefined
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email é necessário' });
  }

  try {
    const userData = await getUserData(email as string);
    
    if (!userData) {
      console.log(`Usuário não encontrado para o e-mail: ${email}`); // Log se o usuário não for encontrado
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error); // Log do erro
    res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
  }
};

