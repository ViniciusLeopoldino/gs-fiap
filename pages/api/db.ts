import * as oracledb from 'oracledb';

interface OracleConnection {
    user: string;
    password: string;
    connectionString: string;
}

async function getConnection(): Promise<oracledb.Connection> {
    try {
        const connection = await oracledb.getConnection({
            user: process.env.ORACLE_USER as string,
            password: process.env.ORACLE_PASSWORD as string,
            connectionString: process.env.ORACLE_CONNECTION_STRING as string,
        } as OracleConnection);
        
        return connection;
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
}

export { getConnection };
