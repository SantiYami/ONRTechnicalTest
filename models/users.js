const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Definir el esquema del personaje
const usersSchema = new mongoose.Schema({
  apiId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  api: { // Campo para diferenciar los datos entre APIs u Orígenes
    type: String,
    required: true
  }
}, {
  timestamps: true // Mongoose añade automáticamente createdAt y updatedAt
});

// Plugin de paginación
usersSchema.plugin(mongoosePaginate);

// Crear el modelo
const Users = mongoose.model('users', usersSchema);

module.exports = Users;