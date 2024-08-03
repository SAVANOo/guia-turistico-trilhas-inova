import conexao from '../../conexao.js';

class DestinoRepository {
    constructor(conexao) {
        this.conexao = conexao;
        this.databaseName = process.env.DB_DATABASE;
    }

    async searchById(destinoId) {
        const sqlQuery = 'SELECT * FROM ?? WHERE id = ?';
        const inserts = [`${this.databaseName}.destino`, destinoId];
        const sql = conexao.format(sqlQuery, inserts);

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0] || null);
                }
            });
        });
    }

    async list() {
        const sqlQuery = 'SELECT * FROM ??';
        const inserts = [`${this.databaseName}.destino`];
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

    async count() {
        const sqlQuery = 'SELECT count(*) as counter FROM ??';
        const inserts = [`${this.databaseName}.destino`];
        const sql = conexao.format(sqlQuery, inserts);

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].counter);
                }
            });
        });
    }
}

export default new DestinoRepository(conexao);
