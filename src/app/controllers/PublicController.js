import dotenv from 'dotenv';
import DestinoRepository from '../repositories/DestinoRepository.js';
import DestinoResponseDTO from '../dtos/DestinoResponseDTO.js';

dotenv.config()

class PublicController {

    async index(req, res) {
        try {
            const destinoList = await DestinoRepository.list();
            const count = await DestinoRepository.count();

            let randomIndex = count;
            if (count > 1) randomIndex = Math.floor(Math.random() * count);

            const destinoDTOList = destinoList.map(destino => new DestinoResponseDTO(destino));

            return res.render('default/index', { destinoList: destinoDTOList, randomIndex: randomIndex });
        } catch {
            return res.render('default/notFound');
        }
    }

    notFound(req, res) {
        return res.render('default/notFound');
    }
}

export default new PublicController();
