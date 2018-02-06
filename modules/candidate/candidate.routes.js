const CandidateController = require('./candidate.controller');
const Joi = require('joi');

const candidateSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  company: Joi.string().required()
});

module.exports = [{
  path: '/candidates',
  method: 'GET',
  config: {
    handler: CandidateController.list,
    description: 'Find all the candidates',
    tags: ['api'],
    notes: 'Returns all the candidates'
  }
}, {
  path: '/candidates/{id}',
  method: 'GET',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: CandidateController.get,
    description: 'Find a candidate by ID',
    tags: ['api'],
    notes: 'Returns a single candidate found with a given ID'
  }
}, {
  path: '/candidates',
  method: 'POST',
  config: {
    validate: {
      payload: candidateSchema
    },
    handler: CandidateController.create,
    description: 'Create a new candidate',
    tags: ['api'],
    notes: 'Returns a newly created candidate'
  }
}, {
  path: '/candidates/{id}',
  method: 'PUT',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      }),
      payload: Joi.object().keys({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        email: Joi.string().optional(),
        company: Joi.string().optional()
      })
    },
    handler: CandidateController.update,
    description: 'Find and update a candidate by ID',
    tags: ['api'],
    notes: 'Returns an updated candidate'
  }
}, {
  path: '/candidates/{id}',
  method: 'DELETE',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: CandidateController.remove,
    description: 'Delete a candidate by ID',
    tags: ['api'],
    notes: 'Returns a success message'
  }
}];