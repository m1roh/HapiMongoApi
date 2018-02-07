const UserController = require('./user.controller');
const Joi = require('joi');

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = [{
  path: '/users/signup',
  method: 'POST',
  config: {
    handler: UserController.signup,
    validate: {
      payload: userSchema
    },
    description: 'Let a new user create an account',
    tags: ['api'],
    notes: 'Returns a signup response'
  }
}, {
  path: '/users/login',
  method: 'POST',
  config: {
    handler: UserController.login,
    validate: {
      payload: userSchema
    },
    description: 'Let a user login to his account',
    tags: ['api'],
    notes: 'Returns a JSON Web Token'
  }
}, {
  path: '/users',
  method: 'GET',
  config: {
    handler: UserController.list,
    description: 'Find all the users',
    tags: ['api'],
    notes: 'Returns all the users'
  }
}, {
  path: '/users/{id}',
  method: 'GET',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: UserController.get,
    description: 'Find a user by ID',
    tags: ['api'],
    notes: 'Returns a single user found with a given ID'
  }
}, {
  path: '/users/{id}',
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
    handler: UserController.update,
    description: 'Find and update a user by ID',
    tags: ['api'],
    notes: 'Returns an updated user'
  }
}, {
  path: '/users/{id}',
  method: 'DELETE',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    handler: UserController.remove,
    description: 'Delete a user by ID',
    tags: ['api'],
    notes: 'Returns a success message'
  }
}];