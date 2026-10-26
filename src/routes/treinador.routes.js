
import express from 'express';
import * as service from '../services/treinador.services.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(await service.listar());
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar treinadores.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Informe o nome.' });
    }

    res.status(201).json(await service.criar({ nome }));
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar treinador.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Informe o nome.' });
    }

    const treinador = await service.atualizar(req.params.id, { nome });

    if (!treinador) {
      return res.status(404).json({ erro: 'Treinador não encontrado.' });
    }

    res.json(treinador);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar treinador.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Informe o nome.' });
    }

    const treinador = await service.atualizar(req.params.id, { nome });

    if (!treinador) {
      return res.status(404).json({ erro: 'Treinador não encontrado.' });
    }

    res.json(treinador);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar treinador.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const quantidade = await service.excluir(req.params.id);

    if (!quantidade) {
      return res.status(404).json({ erro: 'Treinador não encontrado.' });
    }

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao excluir treinador.' });
  }
});

export default router;