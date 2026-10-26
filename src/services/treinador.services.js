
import db from '../config/db.js';

export async function listar() {
  return db('treinador').select('*');
}

export async function criar(dados) {
  const [treinador] = await db('treinador')
    .insert(dados)
    .returning('*');

  return treinador;
}

export async function atualizar(id, dados) {
  const [treinador] = await db('treinador')
    .where({ id })
    .update(dados)
    .returning('*');

  return treinador;
}

export async function excluir(id) {
  return db('treinador').where({ id }).del();
}