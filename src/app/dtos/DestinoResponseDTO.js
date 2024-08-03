class DestinoResponseDTO {
    constructor(params) {
        this.id = params.id;
        this.cidade = params.cidade;
        this.descricao = params.descricao;
        this.urlIframeGoogleMaps = params.urlIframeGoogleMaps;
        this.urlFoto = params.urlFoto;
    }
}

export default DestinoResponseDTO;
