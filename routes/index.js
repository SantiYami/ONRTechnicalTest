const express = require('express');
const router = express.Router();
const { getUsersByApiPaginated, getUserCountByApi } = require('../services/userService');
const { getTotalCountPokemon, fetchAndSaveAllPokemon } = require('../services/pokemonService');
const { getTotalCountRickAndMorty, fetchAndSaveAllRickAndMorty } = require('../services/rickAndMortyService');
const { getTotalCountSwapi, fetchAndSaveAllSwapi } = require('../services/swapiService');
const { API_RICK_AND_MORTY, API_POKEMON, API_SWAPI } = require('../config/constants');

const { connectToDatabase } = require('../config/db');

//Test connection
connectToDatabase();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Ruta para obtener datos de PokeAPI con paginación
router.get('/pokemon', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;

  try {
    const api = API_POKEMON;
    const totalApiCount = await getTotalCountPokemon();
    const totalDbCount = await getUserCountByApi(api);

    // Si no se pudo obtener el conteo de la API, pasa a consultar directamente la base de datos
    if (totalApiCount === null) {
      const users = await getUsersByApiPaginated(api, page, limit);
      return res.json(users);
    }
    
    // Si los conteos no coinciden, actualizar la colección
    if (totalApiCount !== totalDbCount) {
      await fetchAndSaveAllPokemon();
    }

    // Consultar en la base de datos con paginación
    const users = await getUsersByApiPaginated(api, page, limit);

    res.json(users);
  } catch (error) {
    console.error('Error retrieving Pokémon\' information', error);
    res.status(500).json({ message: 'Error retrieving Pokémon\' information' });
  }
});

// Ruta para obtener datos de Rick and Morty API con paginación
router.get('/rickandmorty', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;

  try {
    const api = API_RICK_AND_MORTY;
    const totalApiCount = await getTotalCountRickAndMorty();
    const totalDbCount = await getUserCountByApi(api);

    // Si no se pudo obtener el conteo de la API, pasa a consultar directamente la base de datos
    if (totalApiCount === null) {
      const users = await getUsersByApiPaginated(api, page, limit);
      return res.json(users);
    }

    // Si los conteos no coinciden, actualizar la colección
    if (totalApiCount !== totalDbCount) {
      await fetchAndSaveAllRickAndMorty();
    }

    // Consultar en la base de datos con paginación
    const users = await getUsersByApiPaginated(api, page, limit);

    res.json(users);
  } catch (error) {
    console.error('Error retrieving Rick and Morty characters\' information', error);
    res.status(500).json({ message: 'Error retrieving Rick and Morty characters\' information' });
  }
});

// Ruta para obtener datos de SWAPI con paginación
router.get('/sw', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;

  try {
    const api = API_SWAPI;
    const totalApiCount = await getTotalCountSwapi();
    const totalDbCount = await getUserCountByApi(api);

    // Si no se pudo obtener el conteo de la API, pasa a consultar directamente la base de datos
    if (totalApiCount === null) {
      const users = await getUsersByApiPaginated(api, page, limit);
      return res.json(users);
    }

    // Si los conteos no coinciden, actualizar la colección
    if (totalApiCount !== totalDbCount) {
      await fetchAndSaveAllSwapi();
    }

    // Consultar en la base de datos con paginación
    const users = await getUsersByApiPaginated(api, page, limit);

    res.json(users);
  } catch (error) {
    console.error('Error retrieving Star Wars people\' information', error);
    res.status(500).json({ message: 'Error retrieving Star Wars people\' information' });
  }
});

module.exports = router;