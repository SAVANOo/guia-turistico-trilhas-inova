import dotenv from 'dotenv';
import Destino from '../models/Destino.js';
import DestinoRepository from '../repositories/DestinoRepository.js';
import DestinoResponseDTO from '../dtos/DestinoResponseDTO.js';
import AtrativoRepository from '../repositories/AtrativoRepository.js';
import AtrativoResponseDTO from '../dtos/AtrativoResponseDTO.js';

dotenv.config()

class DestinoController {
    async show(req, res) {
        const id = req.params.id;
        try {
            const destino = await DestinoRepository.searchById(id);
            const atrativos = await AtrativoRepository.listByDestinoId(id)
            if (!destino) return res.status(404).json({ message: 'Destino não encontrado.' });
            const destinoDTO = new DestinoResponseDTO(destino);
            const atrativosDTO = atrativos.map(atrativo => new AtrativoResponseDTO(atrativo));

            return res.render('destino/show', { destino: destinoDTO, atrativos: atrativosDTO });
        } catch (error) {
            console.error('DestinoController.show >> Erro ao buscar o destino:', error);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
}

export default new DestinoController();
