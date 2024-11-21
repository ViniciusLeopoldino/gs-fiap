import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, senha, confsenha, nome, cpf, cargo, departamento } = req.body;

        if (!email || !senha || !nome) {
            return res.status(400).json({ error: 'Email, senha e nome são obrigatórios.' });
        }

        if (senha !== confsenha) {
            return res.status(400).json({ error: 'A senha e a confirmação da senha não coincidem.' });
        }

        try {
            const connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO cadastro (email, senha, confsenha, nome, cpf, cargo, departamento, data_cadastro) 
                 VALUES (:email, :senha, :confsenha, :nome, :cpf, :cargo, :departamento, SYSDATE)`,
                { email, senha, confsenha, nome, cpf, cargo, departamento, },
                { autoCommit: true }
            );

            await connection.close();
            return res.status(201).json({ message: 'Cadastro realizado com sucesso.' });
        } catch (err) {
            console.error('Erro ao realizar o cadastro:', err);
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            return res.status(500).json({ error: 'Erro ao realizar o cadastro. Detalhes: ' + errorMessage });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
