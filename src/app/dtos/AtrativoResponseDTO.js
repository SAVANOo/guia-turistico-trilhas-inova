class AtrativoResponseDTO {
    constructor(params) {
        this.id = params.id;
        this.destinoId = params.destinoId;
        this.titulo = params.titulo;
        this.descricao = params.descricao;
        this.tipo = params.tipo;
        this.urlFoto = params.urlFoto;
        this.avaliacao = params.avaliacao;
    }
}

export default AtrativoResponseDTO;
