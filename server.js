const Hapi = require('hapi');
const mongoose = require('mongoose');

const plugins = require('./config/plugins');

// Define the mongoDb url
const mongoDbUrl = 'mongodb://localhost:27017/hapi_db';

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});

(async () => {
  try {
    await server.register(plugins);
  } catch (err) {
    console.log(err);
  }

  try {
    await server.start();

    // Once server started, connect to Mongo through Mongoose
    mongoose.connect(mongoDbUrl, {}).then(() => {
      console.log('Connected to Mongo server');
    }).catch((err) => {
      console.log(err);
    });
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();