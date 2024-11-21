import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from './db';

const updateUserData = async (userData: any) => {
  const connection = await getConnection();
  const { email, nome, cpf, telefone, cep, modelo, ano, placa, cor } = userData;

  // Ajuste a consulta conforme sua tabela
  const result = await connection.execute(
    `UPDATE cadastro SET
      nome = :nome,
      cpf = :cpf,
      telefone = :telefone,
      cep = :cep,
      modelo = :modelo,
      ano = :ano,
      placa = :placa,
      cor = :cor
    WHERE email = :email`,
    {
      nome,
      cpf,
      telefone,
      cep,
      modelo,
      ano,
      placa,
      cor,
      email,
    }
  );

  await connection.commit(); // Commit das alterações
  return result;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const userData = req.body;
    await updateUserData(userData);
    res.status(200).json({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados do usuário' });
  }
};
