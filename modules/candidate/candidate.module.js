const candidateRoutes = require('./candidate.routes');

const CandidateModule = {
  name: 'CandidateModule',
  register: function (server, options) {
    server.route(candidateRoutes);
  }
};

CandidateModule.register.attributes = {
  name: 'CandidateModule',
  pkg: require('../../package.json')
};

module.exports = CandidateModule;