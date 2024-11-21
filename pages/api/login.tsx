import { getConnection } from './db';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
        }

        let connection;

        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT * FROM cadastro WHERE email = :email AND senha = :senha`,
                { email, senha: password }
            );

            if (result.rows && result.rows.length > 0) {
                return res.status(200).json({ message: 'Login bem-sucedido.' });
            } else {
                return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
            }
        } catch (err) {
            console.error("Erro ao realizar o login:", err);
            return res.status(500).json({ error: 'Erro ao realizar o login.' });
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (closeErr) {
                    console.error("Erro ao fechar a conexão:", closeErr);
                }
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

