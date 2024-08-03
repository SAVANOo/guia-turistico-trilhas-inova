import conexao from '../../conexao.js';

class UsuarioRepository {
    constructor(conexao) {
        this.conexao = conexao;
        this.databaseName = process.env.DB_DATABASE;
    }

    async criarUsuario(email, senhaEncriptada) {
        const sqlQuery = 'INSERT INTO ?? (email, senha) VALUES (?, ?)';
        const inserts = [`${this.databaseName}.usuarios`, email, senhaEncriptada];
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

    async buscarUsuarioPorEmail(email) {
        const sqlQuery = 'SELECT * FROM ?? WHERE email = ?';
        const inserts = [`${this.databaseName}.usuarios`, email];
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

    async buscarUsuarioPorId(id) {
        const sqlQuery = 'SELECT * FROM ?? WHERE id = ?';
        const inserts = [`${this.databaseName}.usuarios`, id];
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
}

export default new UsuarioRepository(conexao);
