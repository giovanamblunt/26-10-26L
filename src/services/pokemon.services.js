
import db from '../config/db.js';

export async function listar() {
  return db('pokemon')
    .join('treinador', 'pokemon.treinador_id', 'treinador.id')
    .select('pokemon.*', 'treinador.nome as treinador');
}

export async function criar(dados) {
  const [pokemon] = await db('pokemon')
    .insert(dados)
    .returning('*');

  return pokemon;
}

export async function atualizar(id, dados) {
  const [pokemon] = await db('pokemon')
    .where({ id })
    .update(dados)
    .returning('*');

  return pokemon;
}

export async function excluir(id) {
  return db('pokemon').where({ id }).del();
}