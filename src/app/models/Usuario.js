class Usuario {
    constructor(id, email, senha) {
        this.id = id;
        this.email = email;
        this.senha = senha;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
        };
    }
}

export default Usuario;
