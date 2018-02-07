const Boom = require('boom');
const User = require('./user.model');
const UtilityService = require('../../services/utility.service');

module.exports = {

  /**
   * Register a new user
   * @param {*} req
   * @param {*} h
   * @return {*} A success message
   */
  async signup(req, h) {

    const userData = {
      email: req.payload.email,
      password: req.payload.password
    };

    try {
      const user = new User(userData);

      user.password = await UtilityService.hashPassword(user.password);

      const savedUser = await user.save();

      return h
        .response('User created successfully')
        .code(200);
    } catch (error) {
      throw Boom.badImplementation('Signup Failed', error);
    }
  },

  /**
   * Let the user login to his account
   * @param {*} req
   * @param {*} h
   * @return {*} A JSON Web Token
   */
  async login(req, h) {

    try {

      const user = await User.findOne({
        email: req.payload.email
      });

      if (!user) {
        return Boom.unauthorized('Invalid credentials provided');
      }

      const matched = await UtilityService.comparePassword(req.payload.password, user.password);

      if (matched) {
        return h
        .response('User logged successfuly')
        .code(200);
      } else {
        return Boom.unauthorized('Invalid credentials provided');
      }

    } catch (error) {
      throw Boom.badImplementation('Login Failed', error);
    }
  },

  /**
   * Find all users
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} All the users
   */
  async list(req, h) {

    try {
      const users = await User.find({})
        .populate('company')
        .exec();

      return h
        .response(users)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single user by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A user found with a given ID
   */
  async get(req, h) {

    try {
      const user = await User.findById(req.params.id).exec();

      if (!user) {
        return h
          .response('User not found')
          .code(404);
      } else {
        return h
          .response({user: user})
          .code(200);
      }
    } catch (error) {
      return error;
    }
  },

  /**
   * Update a user by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} The updated user
   */
  async update(req, h) {

    let userNewDatas = {};

    if (req.payload.title) {
      userNewDatas.title = req.payload.title;
    }

    if (req.payload.company) {
      userNewDatas.company = req.payload.company;
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, userNewDatas, {new: true}).exec();

      if (!user) {
        return h
          .response({err: 'User not found '})
          .code(404);
      }

      return h
        .response(`${user} : updated successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a user by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A success message
   */
  async remove(req, h) {

    try {
      const user = await User.findByIdAndRemove(req.params.id, (err, res) => {
        if (err) {
          return h
            .response({err: err})
            .code(500);
        }
      });

      return h
        .response(`User with id : ${req.params.id} correctly suppressed`)
        .code(200);
    } catch (error) {
      throw error;
    }
  }
};