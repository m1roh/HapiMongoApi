// Import the API modules
const CompanyModule = require('../modules/company/company.module');
const ApplicationModule = require('../modules/application/application.module');
const CandidateModule = require('../modules/candidate/candidate.module');
const JobModule = require('../modules/job/job.module');
const UserModule = require('../modules/user/user.module');

const goodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{log: '*', response: '*'}]
    }, {
      module: 'good-console'
    }, 'stdout'],
    myFileReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ops: '*'}]
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
      args: [{error: '*'}]
    }, {
      module: 'good-http',
      args: ['http://prod.logs:3000', {
        wreck: {
          headers: {'x-api-key': 12345}
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

module.exports = [
    {
      plugin: require('inert')
    }, {
      plugin: require('vision')
    }, {
      plugin: require('good'),
      goodOptions
    }, {
      plugin: require('hapi-swagger'),
      swaggerOptions
    },
    CompanyModule,
    ApplicationModule,
    CandidateModule,
    JobModule,
    UserModule
];