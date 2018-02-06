const CompanyController = require('./company.controller');
const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().required(),
  city: Joi.string().optional(),
  address: Joi.string().optional()
});

module.exports = [{
  path: '/companies',
  method: 'GET',
  config: {
    handler: CompanyController.list,
    description: 'Find all the companies',
    tags: ['api'],
    notes: 'Returns all the companies'
  }
}, {
  path: '/companies/{id}',
  method: 'GET',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: CompanyController.get,
    description: 'Find a company by ID',
    tags: ['api'],
    notes: 'Returns a single company found with a given ID'
  }
}, {
  path: '/companies',
  method: 'POST',
  config: {
    validate: {
      payload: schema
    },
    handler: CompanyController.create,
    description: 'Create a new company',
    tags: ['api'],
    notes: 'Returns a newly created company'
  }
}, {
  path: '/companies/{id}',
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
    handler: CompanyController.update,
    description: 'Find and update a company by ID',
    tags: ['api'],
    notes: 'Returns an updated company'
  }
}, {
  path: '/companies/{id}',
  method: 'DELETE',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: CompanyController.remove,
    description: 'Delete a company by ID',
    tags: ['api'],
    notes: 'Returns a success message'
  }
}];