import sendServerRequest from './baseService';

async function getPokemon(pokemonId: number | string) {
  const response = await sendServerRequest('GET', `https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  return response;
}

const pokemonService = {
  getPokemon,
};

export default pokemonService;
