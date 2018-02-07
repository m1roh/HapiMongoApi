const Application = require('./application.model');

module.exports = {

  /**
   * Create an application
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A newly created application
   */
  async create(req, h) {

    const applicationData = {
      hired: req.payload.hired,
      job: req.payload.job,
      candidate: req.payload.candidate
    };

    try {
      const application = await Application.create(applicationData);

      return h
        .response(`${application} : created successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find all applications
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} All the applications
   */
  async list(req, h) {

    try {
      const application = await Application
        .find({})
        .populate('job')
        .populate('candidate')
        .exec();

      return h
        .response({applications: application})
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single application by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} An application found with a given ID
   */
  async get(req, h) {

    try {
      const application = await Application.findById(req.params.id).exec();

      if (!application) {
        return h
          .response('Application not found')
          .code(404);
      }

      return h
        .response({application: application})
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a application by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} The updated application
   */
  async update(req, h) {

    let applicationNewDatas = {};

    if (req.payload.firstName) {
      applicationNewDatas.firstName = req.payload.firstName;
    }

    if (req.payload.lastName) {
      applicationNewDatas.lastName = req.payload.lastName;
    }

    if (req.payload.email) {
      applicationNewDatas.email = req.payload.email;
    }

    if (req.payload.company) {
      applicationNewDatas.company = req.payload.company;
    }

    try {
      const application = await Application.findByIdAndUpdate(req.params.id, applicationNewDatas, {new: true}).exec();

      if (!application) {
        return h
          .response({err: 'Application not found '})
          .code(404);
      }

      return h
        .response(`${application} : updated successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a application by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A success message
   */
  async remove(req, h) {

    try {
      const application = await Application.findByIdAndRemove(req.params.id, (err, res) => {
        if (err) {
          return h
            .response({err: err})
            .code(500);
        }
      });

      return h
        .response(`Application with id : ${req.params.id} correctly suppressed`)
        .code(200);
    } catch (error) {
      throw error;
    }
  }
};