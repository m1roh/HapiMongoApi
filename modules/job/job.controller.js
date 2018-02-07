const Job = require('./job.model');
const Company = require('../company/company.model');

module.exports = {

  /**
   * Create a job
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A newly created job
   */
  async create(req, h) {

    const jobData = {
      title: req.payload.title,
      company: req.payload.company
    };

    try {
      const job = await Job.create(jobData);

      const _company = await Company.findById(req.payload.company);

      _company.jobs.push(job),
        _company.save();

      return h
        .response(`${job} : created successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find all jobs
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} All the jobs
   */
  async list(req, h) {

    try {
      const jobs = await Job.find({})
        .populate('company')
        .exec();

      return h
        .response(jobs)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single job by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A single job found with the given ID
   */
  async get(req, h) {

    try {
      const job = await Job.findById(req.params.id).exec();

      if (!job) {
        return h
          .response('Job not found')
          .code(404);
      } else {
        return h
          .response({job: job})
          .code(200);
      }
    } catch (error) {
      return error;
    }
  },

  /**
   * Update a job by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} The updated job
   */
  async update(req, h) {

    let jobNewDatas = {};

    if (req.payload.title) {
      jobNewDatas.title = req.payload.title;
    }

    if (req.payload.company) {
      jobNewDatas.company = req.payload.company;
    }

    try {
      const job = await Job.findByIdAndUpdate(req.params.id, jobNewDatas, {new: true}).exec();

      if (!job) {
        return h
          .response({err: 'Job not found '})
          .code(404);
      }

      return h
        .response(`${job} : updated successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a job by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A success message
   */
  async remove(req, h) {

    try {
      const job = await Job.findByIdAndRemove(req.params.id, (err, res) => {
        if (err) {
          return h
            .response({err: err})
            .code(500);
        }
      });

      return h
        .response(`Job with id : ${req.params.id} correctly suppressed`)
        .code(200);
    } catch (error) {
      throw error;
    }
  }
};