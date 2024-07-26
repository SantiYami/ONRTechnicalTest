const { swApi } = require('../http_common');
const { saveUsers } = require('./userService');
const { API_SWAPI } = require('../config/constants');
const extractIdFromUrl = require('../utils/util');

// Función para obtener los datos de la primera página y verificar la existencia de más páginas
const getTotalCountSwapi = async () => {
  try {
    const response = await swApi.get('people');
    return response.data.count; // Devuelve el conteo total
  } catch (error) {
    console.error('Error getting data from the first SWAPI page', error);
    throw error;
  }
};

// Función para obtener todos los datos de SWAPI
const fetchAndSaveAllSwapi = async () => {
  try {
    let currentPage = 1;
    let hasNextPage = true;
    const allPeople = [];

    while (hasNextPage) {
      const response = await swApi.get(`people/?page=${currentPage}`);
      const { results, next } = response.data;
      allPeople.push(...results);

      hasNextPage = next !== null;
      currentPage += 1;
    }

    // Prepara los datos para guardar
    const users = allPeople.map(person => ({
      apiId: extractIdFromUrl(person.url),
      name: person.name,
      api: API_SWAPI
    }));

    await saveUsers(users);
    console.log('All SWAPI data have been saved in the database.');
  } catch (error) {
    console.error('Error getting and saving all SWAPI data', error);
  }
};

module.exports = { getTotalCountSwapi, fetchAndSaveAllSwapi }