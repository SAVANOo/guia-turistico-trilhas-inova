import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import UsuarioResponseDTO from '../dtos/UsuarioResponseDTO.js';

dotenv.config()

const quantidadeDeRounds = 10;
const chaveDeAssinatura = process.env.JWT_KEY;

class UsuarioController {

    async login(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são necessários." });
        }

        try {
            const usuario = await UsuarioRepository.buscarUsuarioPorEmail(email);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            const token = jwt.sign({ usuarioId: usuario.id, usuarioEmail: usuario.email }, chaveDeAssinatura, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }

    async register(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são necessários." })
        }

        try {
            const senhaEncriptada = await bcrypt.hash(senha, quantidadeDeRounds);
            const novoUsuario = new Usuario(null, email, senhaEncriptada);
            await UsuarioRepository.criarUsuario(novoUsuario);

            res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao tentar registrar usuário:', error);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }

    async show(req, res) {
        const id = req.params.id;
        try {
            const usuario = await UsuarioRepository.buscarUsuarioPorId(id);

            if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });
            
            res.status(200).json(new UsuarioResponseDTO(usuario));
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);

            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
}

export default new UsuarioController();
