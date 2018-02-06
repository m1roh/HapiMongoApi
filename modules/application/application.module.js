const applicationRoutes = require('./application.routes');

const ApplicationModule = {
  name: 'ApplicationModule',
  register: function (server, options) {
    server.route(applicationRoutes);
  }
};

ApplicationModule.register.attributes = {
  name: 'ApplicationModule',
  pkg: require('../../package.json')
};

module.exports = ApplicationModule;