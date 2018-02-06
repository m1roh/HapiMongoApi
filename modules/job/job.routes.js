const JobController = require('./job.controller');
const Joi = require('joi');

const jobSchema = Joi.object().keys({
  title: Joi.string().required(),
  company: Joi.string().required()
});

module.exports = [{
  path: '/jobs',
  method: 'GET',
  config: {
    handler: JobController.list,
    description: 'Find all the jobs',
    tags: ['api'],
    notes: 'Returns all the jobs'
  }
}, {
  path: '/jobs/{id}',
  method: 'GET',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: JobController.get,
    description: 'Find a job by ID',
    tags: ['api'],
    notes: 'Returns a single job found with a given ID'
  }
}, {
  path: '/jobs',
  method: 'POST',
  config: {
    validate: {
      payload: jobSchema
    },
    handler: JobController.create,
    description: 'Create a new job',
    tags: ['api'],
    notes: 'Returns a newly created job'
  }
}, {
  path: '/jobs/{id}',
  method: 'PUT',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      }),
      payload: Joi.object().keys({
        title: Joi.string().optional(),
        company: Joi.string().optional()
      })
    },
    handler: JobController.update,
    description: 'Find and update a job by ID',
    tags: ['api'],
    notes: 'Returns an updated job'
  }
}, {
  path: '/jobs/{id}',
  method: 'DELETE',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: JobController.remove,
    description: 'Delete a job by ID',
    tags: ['api'],
    notes: 'Returns a success message'
  }
}];