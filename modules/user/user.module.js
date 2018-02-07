const userRoutes = require('./user.routes');

const UserModule = {
  name: 'UserModule',
  register: function (server, options) {
    server.route(userRoutes);
  }
};

UserModule.register.attributes = {
  name: 'UserModule',
  pkg: require('../../package.json')
};

module.exports = UserModule;