const jobRoutes = require('./job.routes');

const JobModule = {
  name: 'JobModule',
  register: function (server, options) {
    server.route(jobRoutes);
  }
};

JobModule.register.attributes = {
  name: 'JobModule',
  pkg: require('../../package.json')
};

module.exports = JobModule;