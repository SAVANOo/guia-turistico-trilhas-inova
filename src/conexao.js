import mysql from 'mysql'
import dotenv from 'dotenv';

dotenv.config()

let conexaoConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
};

if (process.env.NODE_ENV === 'production') {
    conexaoConfig.database = process.env.DB_DATABASE;
}

const conexao = mysql.createConnection(conexaoConfig);
conexao.connect();

export default conexao;
