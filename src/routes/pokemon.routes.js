
import express from 'express';
import db from '../config/db.js';
import * as service from '../services/pokemon.services.js';

const router = express.Router();

const tipos = [
  'normal', 'fogo', 'agua', 'grama',
  'voador', 'lutador', 'venenoso'
];

function validar(dados, completo = false) {
  const campos = ['nome', 'nivel', 'tipo', 'treinador_id'];

  if (completo && campos.some(campo => dados[campo] === undefined)) {
    return 'Informe todos os campos.';
  }

  if (Object.keys(dados).some(campo => !campos.includes(campo))) {
    return 'Campo inválido.';
  }

  if ('nome' in dados &&
      (typeof dados.nome !== 'string' || !dados.nome.trim())) {
    return 'Nome inválido.';
  }

  if ('nivel' in dados &&
      (!Number.isInteger(dados.nivel) || dados.nivel < 1)) {
    return 'Nível inválido.';
  }

  if ('tipo' in dados && !tipos.includes(dados.tipo)) {
    return 'Tipo inválido.';
  }

  return null;
}

router.get('/', async (req, res) => {
  try {
    res.json(await service.listar());
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar Pokémon.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const erro = validar(req.body, true);

    if (erro) {
      return res.status(400).json({ erro });
    }

    const treinador = await db('treinador')
      .where({ id: req.body.treinador_id })
      .first();

    if (!treinador) {
      return res.status(400).json({ erro: 'Treinador não encontrado.' });
    }

    const pokemon = await service.criar(req.body);
    res.status(201).json(pokemon);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar Pokémon.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const erro = validar(req.body, true);

    if (erro) {
      return res.status(400).json({ erro });
    }

    const treinador = await db('treinador')
      .where({ id: req.body.treinador_id })
      .first();

    if (!treinador) {
      return res.status(400).json({ erro: 'Treinador não encontrado.' });
    }

    const pokemon = await service.atualizar(req.params.id, req.body);

    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    }

    res.json(pokemon);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar Pokémon.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const erro = validar(req.body);

    if (erro) {
      return res.status(400).json({ erro });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ erro: 'Informe um campo.' });
    }

    if (req.body.treinador_id) {
      const treinador = await db('treinador')
        .where({ id: req.body.treinador_id })
        .first();

      if (!treinador) {
        return res.status(400).json({ erro: 'Treinador não encontrado.' });
      }
    }

    const pokemon = await service.atualizar(req.params.id, req.body);

    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    }

    res.json(pokemon);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar Pokémon.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const quantidade = await service.excluir(req.params.id);

    if (!quantidade) {
      return res.status(404).json({ erro: 'Pokémon não encontrado.' });
    }

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao excluir Pokémon.' });
  }
});

export default router;