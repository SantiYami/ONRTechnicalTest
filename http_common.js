const axios = require('axios');

const defaultConfig = {
  timeout: 120000,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

const createApiInstance = (baseURL) => {
  const instance = axios.create({ ...defaultConfig, baseURL });
  return instance;
};

module.exports = {
  pokeApi: createApiInstance('https://pokeapi.co/api/v2/'),
  rickAndMortyApi: createApiInstance('https://rickandmortyapi.com/api/'),
  swApi: createApiInstance('https://swapi.dev/api/')
};
