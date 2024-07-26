const { pokeApi } = require('../http_common');
const { saveUsers } = require('./userService');
const { API_POKEMON } = require('../config/constants');
const extractIdFromUrl = require('../utils/util');

// Función para obtener el conteo total de Pokémon
const getTotalCountPokemon = async () => {
  try {
    const response = await pokeApi.get('pokemon');
    return response.data.count; // Devuelve el conteo total
  } catch (error) {
    console.error('Error retrieving data from the first page of Pokémon API', error);
    throw error;
  }
};


// Función para obtener datos en lotes y guardarlos en la base de datos
const fetchAndSaveAllPokemon = async () => {
  try {
    const totalCount = await getTotalCountPokemon();
    const batchSize = 100; // Número de elementos por solicitud (si no se sabe la cantidad de elementos posibles a priori, es ideal limitar para no saturar la memoria)
    const requests = [];

    for (let offset = 0; offset < totalCount; offset += batchSize) {
      const url = `pokemon?limit=${batchSize}&offset=${offset}`;
      requests.push(pokeApi.get(url));
    }

    const responses = await Promise.all(requests);
    const allPokemon = responses.flatMap(response => response.data.results);

    // Extrae IDs y prepara los datos para guardar
    const users = allPokemon.map(user => ({
      apiId: extractIdFromUrl(user.url),
      name: user.name,
      api: API_POKEMON
    }));

    await saveUsers(users);
    console.log('All Pokémon data has been saved in the database.');
  } catch (error) {
    console.error('Error obtaining and saving all Pokémon data', error);
  }
};

module.exports = { getTotalCountPokemon, fetchAndSaveAllPokemon }