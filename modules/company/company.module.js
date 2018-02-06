const companyRoutes = require('./company.routes');

const CompanyModule = {
  name: 'CompanyModule',
  register: function (server, options) {
    server.route(companyRoutes);
  }
};

CompanyModule.register.attributes = {
  name: 'CompanyModule',
  pkg: require('../../package.json')
};

module.exports = CompanyModule;