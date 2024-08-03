class Atrativo {
    constructor(destinoId, titulo, descricao, tipo, urlFoto, avaliacao) {
        this.destinoId = destinoId;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipo = tipo;
        this.urlFoto = urlFoto;
        this.avaliacao = avaliacao;
    }

    toJSON() {
        return {
            destinoId: this.destinoId,
            titulo: this.titulo,
            descricao: this.descricao,
            tipo: this.tipo,
            urlFoto: this.urlFoto,
            avaliacao: this.avaliacao,
        };
    }
}

export default Atrativo;
