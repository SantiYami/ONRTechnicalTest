const { rickAndMortyApi } = require('../http_common');
const { saveUsers } = require('./userService');
const { API_RICK_AND_MORTY } = require('../config/constants');

// Función para obtener los datos de la primera página y verificar la existencia de más páginas
const getTotalCountRickAndMorty = async () => {
  try {
    const response = await rickAndMortyApi.get('character');
    return response.data.info.count; // Devuelve el conteo total
  } catch (error) {
    console.error('Error retrieving data from the first page of Rick and Morty API', error);
    throw error;
  }
};

// Función para obtener todos los datos de Rick and Morty API
const fetchAndSaveAllRickAndMorty = async () => {
  try {
    let currentPage = 1;
    let hasNextPage = true;
    const allCharacters = [];

    while (hasNextPage) {
      const response = await rickAndMortyApi.get(`character/?page=${currentPage}`);
      const { results, info } = response.data;
      allCharacters.push(...results);

      hasNextPage = info.next !== null;
      currentPage += 1;
    }

    // Prepara los datos para guardar
    const users = allCharacters.map(character => ({
      apiId: character.id,
      name: character.name,
      api: API_RICK_AND_MORTY
    }));

    await saveUsers(users);
    console.log('All Rick and Morty data has been saved in the database.');
  } catch (error) {
    console.error('Error when getting and saving all Rick and Morty data', error);
  }
};

module.exports = { getTotalCountRickAndMorty, fetchAndSaveAllRickAndMorty }