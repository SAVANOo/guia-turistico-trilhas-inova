import dotenv from 'dotenv';
import AtrativoRepository from '../repositories/AtrativoRepository.js';
import AtrativoResponseDTO from '../dtos/AtrativoResponseDTO.js';

dotenv.config()

class AtrativoController {
    async listByDestino(req, res) {
        const destinoId = req.params.destinoId;

        try {
            const atrativoLista = await AtrativoRepository.listByDestinoId(destinoId);

            if (atrativoLista.length === 0) return res.status(404).json({ message: 'Nenhum atrativo encontrado para este destino.' });

            const atrativoDTOLista = atrativoLista.map(atrativo => new AtrativoResponseDTO(atrativo));
            return res.status(200).json(atrativoDTOLista);
        } catch (error) {
            console.error('AtrativoController.listByDestino >> Erro ao listar os atrativos:', error);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }

    async searchById(req, res) {
        const id = req.params.id;
        try {
            const atrativo = await AtrativoRepository.searchById(id);

            if (atrativo.length === 0) return res.render('error', { genericMessage: "Nenhum atrativo encontrado com este id." });

            const atrativoDTO = new AtrativoResponseDTO(atrativo[0]);

            return res.render('atrativo/show', { atrativo: atrativoDTO });
        } catch (error) {
            console.error('AtrativoController.buscarPorId >> Erro ao buscar o atrativo:', error);
            return res.render('error', { genericMessage: "Erro interno no servidor" });
        }
    }
}

export default new AtrativoController();
