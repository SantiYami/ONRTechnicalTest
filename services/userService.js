const Users = require('../models/users');

// Función para guardar datos en la base de datos
const saveUsers = async (users) => {
  try {
    const operations = users.map(user => ({
      updateOne: {
        filter: { apiId: user.apiId, api: user.api  },
        update: user,
        upsert: true
      }
    }));
    await Users.bulkWrite(operations);
    console.log('Data stored in the database');
  } catch (error) {
    console.error('Error saving data in the database', error);
  }
};

// Función para obtener el conteo de usuarios por API
const getUserCountByApi = async (api) => {
  try {
    const count = await Users.countDocuments({ api }).exec();
    return count;
  } catch (error) {
    console.error('Error in obtaining user count by API', error);
    throw error;
  }
};

// Función para obtener usuarios paginados por API
const getUsersByApiPaginated = async (api, page, limit) => {
  try {
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      lean: true,
      sort: { apiId: 1 } // Ordenar ascendente
    };

    const query = { api };

    const users = await Users.paginate(query, options);
    return users;
  } catch (error) {
    console.error('Error getting paged users by API', error);
    throw error;
  }
};

// Función para obtener usuarios
const getUsers = async (query) => {
  try {
    return await Users.find(query).exec();
  } catch (error) {
    console.error('Error getting users', error);
    throw error;
  }
};

module.exports = { saveUsers, getUserCountByApi, getUsersByApiPaginated, getUsers };