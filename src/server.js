
import 'dotenv/config';
import express from 'express';
import treinadorRoutes from './routes/treinador.routes.js';
import pokemonRoutes from './routes/pokemon.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Pokémon funcionando!');
});

app.use('/treinador', treinadorRoutes);
app.use('/pokemon', pokemonRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:3000`);
});