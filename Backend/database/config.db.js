const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('DataBase OnLine');
  } catch (e) {
    console.log(e);
    throw new Error('Error starting the database');
  }
};

module.exports = {
  dbConnection,
};
