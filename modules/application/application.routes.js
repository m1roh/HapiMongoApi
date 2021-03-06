const ApplicationController = require('./application.controller');
const Joi = require('joi');

const applicationSchema = Joi.object().keys({
  hired: Joi.boolean().optional(),
  job: Joi.string().required(),
  candidate: Joi.string().required()
});

module.exports = [{
  path: '/applications',
  method: 'GET',
  config: {
    handler: ApplicationController.list,
    description: 'Find all the applications',
    tags: ['api'],
    notes: 'Returns all the applications'
  }
}, {
  path: '/applications/{id}',
  method: 'GET',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: ApplicationController.get,
    description: 'Find an application by ID',
    tags: ['api'],
    notes: 'Returns a single application found with a given ID'
  }
}, {
  path: '/applications',
  method: 'POST',
  config: {
    validate: {
      payload: applicationSchema
    },
    handler: ApplicationController.create,
    description: 'Create a new application',
    tags: ['api'],
    notes: 'Returns a newly created application'
  }
}, {
  path: '/applications/{id}',
  method: 'PUT',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      }),
      payload: Joi.object().keys({
        name: Joi.string().optional(),
        city: Joi.string().optional(),
        address: Joi.string().optional()
      })
    },
    handler: ApplicationController.update,
    description: 'Find and update an application by ID',
    tags: ['api'],
    notes: 'Returns an updated application'
  }
}, {
  path: '/applications/{id}',
  method: 'DELETE',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: ApplicationController.remove,
    description: 'Delete an application by ID',
    tags: ['api'],
    notes: 'Returns a success message'
  }
}];