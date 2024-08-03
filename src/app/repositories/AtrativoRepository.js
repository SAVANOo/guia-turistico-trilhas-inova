import conexao from '../../conexao.js';

class AtrativoRepository {
    constructor(conexao) {
        this.conexao = conexao;
        this.databaseName = process.env.DB_DATABASE;
    }

    async listByDestinoId(destinoId) {
        const sqlQuery = 'SELECT * FROM ?? WHERE destinoId = ?';
        const inserts = [`${this.databaseName}.atrativo`, destinoId];
        const sql = conexao.format(sqlQuery, inserts);

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async searchById(atrativoId) {
        const sqlQuery = 'SELECT * FROM ?? WHERE id = ?';
        const inserts = [`${this.databaseName}.atrativo`, atrativoId];
        const sql = conexao.format(sqlQuery, inserts);

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

export default new AtrativoRepository(conexao);
