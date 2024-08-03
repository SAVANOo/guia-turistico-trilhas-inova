import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import database from './database.js';
import AtrativoController from './src/app/controllers/AtrativoController.js';
import UsuarioController from './src/app/controllers/UsuarioController.js';
import DestinoController from './src/app/controllers/DestinoController.js';
import PublicController from './src/app/controllers/PublicController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) + '\\public';

const app = express();

// Indicar para o express ler body com json
app.use(express.json());

// Configurar o EJS como o motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Inicializar banco de dados
database.inicializarBancoDeDados();

// ROTAS

app.post('/usuario/login', UsuarioController.login);
app.post('/usuario/register', UsuarioController.register);
app.get('/usuario/show/:id', UsuarioController.show);

app.get('/destino/show/:id', DestinoController.show);

app.get('/atrativo/show/:id', AtrativoController.searchById);
app.get('/atrativo/list/:destinoId', AtrativoController.listByDestino);

app.get('/index', PublicController.index);
app.get('*', PublicController.notFound);

export default app;
