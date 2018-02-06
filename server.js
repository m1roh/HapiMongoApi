const Hapi = require('hapi');
const mongoose = require('mongoose');

// Import the API modules
const CompanyModule = require('./modules/company/company.module');
const ApplicationModule = require('./modules/application/application.module');
const CandidateModule = require('./modules/candidate/candidate.module');
const JobModule = require('./modules/job/job.module');

// Define the mongoDb url
const mongoDbUrl = 'mongodb://localhost:27017/hapi_db';

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});

// Register the plugins
const goodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout'],
    myFileReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ ops: '*' }]
    }, {
      module: 'good-squeeze',
      name: 'SafeJson'
    }, {
      module: 'good-file',
      args: ['./test/fixtures/awesome_log']
    }],
    myHTTPReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ error: '*' }]
    }, {
      module: 'good-http',
      args: ['http://prod.logs:3000', {
        wreck: {
          headers: { 'x-api-key': 12345 }
        }
      }]
    }]
  }
};

const swaggerOptions = {
  info: {
    title: 'API Documentation',
    version: '0.0.1'
  }
};

(async () => {
  try {
    await server.register([
      {
        plugin: require('inert')
      },
      {
        plugin: require('vision')
      },
      {
        plugin: require('hapi-swagger'),
        swaggerOptions
      }, {
        plugin: require('good'),
        goodOptions
      },
      CompanyModule,
      ApplicationModule,
      CandidateModule,
      JobModule
    ])
  } catch (err) {
    console.log(err);
  }

  try {
    await server.start();

    // Once server started, connect to Mongo through Mongoose
    mongoose.connect(mongoDbUrl, {}).then(() => {
      console.log(`Connected to Mongo server`);
    }).catch((err) => {
      console.log(err);
    });
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();