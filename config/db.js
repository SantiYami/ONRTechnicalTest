const mongoose = require('mongoose');
const uri = "mongodb+srv://ONRAdmin:2noDmVzqoKSgNHUc@onrusersapi.8imlvkb.mongodb.net/ONRTest?retryWrites=true&w=majority&appName=ONRUsersAPI";

async function connectToDatabase() {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("Successfully connected to MongoDB with Mongoose!");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
    }
  }

module.exports = { connectToDatabase };