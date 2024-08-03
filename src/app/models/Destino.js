class Destino {
    constructor(cidade, descricao, urlIframeGoogleMaps, urlFoto ) {
        this.cidade = cidade;
        this.descricao = descricao;
        this.urlIframeGoogleMaps = urlIframeGoogleMaps;
        this.urlFoto = urlFoto;
    }

    toJSON() {
        return {
            cidade: this.cidade,
            descricao: this.descricao,
            urlIframeGoogleMaps: this.urlIframeGoogleMaps,
            urlFoto: this.urlFoto,
        };
    }
}

export default Destino;
