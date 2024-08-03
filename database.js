import conexao from './src/conexao.js';
import dotenv from 'dotenv';

dotenv.config()
class Database {
    constructor(conexao) {
        this.conexao = conexao;
        this.databaseName = process.env.DB_DATABASE;
    }

    async verificarBancoDeDados() {
        const checkDatabaseQuery = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${this.databaseName}'`;
        return new Promise((resolve, reject) => {
            this.conexao.query(checkDatabaseQuery, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0);
                }
            });
        });
    }

    async criarBancoDeDados() {
        const createDatabaseQuery = `CREATE SCHEMA \`${this.databaseName}\` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;`;
        return new Promise((resolve, reject) => {
            this.conexao.query(createDatabaseQuery, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async criarTabelaUsuario() {
        const createTableUsuario = `CREATE TABLE \`${this.databaseName}\`.usuarios (id INT NOT NULL AUTO_INCREMENT, email VARCHAR(45) NULL, senha VARCHAR(45) NULL, PRIMARY KEY(id));`
        return new Promise((resolve, reject) => {
            this.conexao.query(createTableUsuario, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async criarTabelaDestino() {
        const createTableDestino = `CREATE TABLE \`${this.databaseName}\`.destino ( id INT NOT NULL AUTO_INCREMENT, cidade VARCHAR(45) NOT NULL, descricao VARCHAR(500) NOT NULL, urlIframeGoogleMaps VARCHAR(500) NULL, urlFoto VARCHAR(500) NULL, PRIMARY KEY (id));`

        return new Promise((resolve, reject) => {
            this.conexao.query(createTableDestino, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async criarTabelaAtrativo() {
        const createTableAtrativo = `CREATE TABLE \`${this.databaseName}\`.atrativo ( id INT NOT NULL AUTO_INCREMENT, destinoId INT NOT NULL, titulo VARCHAR(45) NULL, descricao VARCHAR(350) NULL, tipo VARCHAR(20) NULL, urlFoto VARCHAR(500) NULL, avaliacao DECIMAL(3,1) NULL, PRIMARY KEY (id), INDEX destinoId_idx (destinoId), CONSTRAINT fk_destino FOREIGN KEY (destinoId) REFERENCES guiaturisticotrilhasdb.destino (id) ON DELETE NO ACTION ON UPDATE NO ACTION );`

        return new Promise((resolve, reject) => {
            this.conexao.query(createTableAtrativo, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async inicializarBancoDeDados() {
        try {
            const bancoExiste = await this.verificarBancoDeDados();
            if (bancoExiste) {
                console.log('Banco de dados já existe.');
                return;
            }

            await this.criarBancoDeDados();
            console.log('Banco de dados criado com sucesso!');

            await this.criarTabelaUsuario();
            console.log('Tabela de usuários criada com sucesso!');

            await this.criarTabelaDestino();
            console.log('Tabela de destino criada com sucesso!');

            await this.criarTabelaAtrativo();
            console.log('Tabela de atrativo criada com sucesso!');
        } catch (err) {
            console.error('Erro ao inicializar o banco de dados:', err);
        }
    }
}

const database = new Database(conexao);
export default database;
