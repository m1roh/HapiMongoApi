const Candidate = require('./candidate.model');
const Company = require('../company/company.model');

module.exports = {

  /**
   * Create a candidate
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A newly created candidate
   */
  async create(req, h) {

    const candidateData = {
      firstName: req.payload.firstName,
      lastName: req.payload.lastName,
      email: req.payload.email,
      company: req.payload.company
    };

    try {
      const candidate = await Candidate.create(candidateData);

      const _company = await Company.findById(req.payload.company);

      _company.candidates.push(candidate);
      _company.save();

      return h
        .response(`${candidate} : created successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find all candidates
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} All the candidates
   */
  async list(req, h) {

    try {
      const candidate = await Candidate.find({}).populate('company').exec();

      return h
        .response({candidates: candidate})
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single candidate by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A single candidate found with a given ID
   */
  async get(req, h) {

    try {
      const candidate = await Candidate.findById(req.params.id).exec();

      if (!candidate) {
        return h
          .response('Candidate not found')
          .code(404);
      } else {
        return h
          .response({candidate: candidate})
          .code(200);
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a candidate by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} The updated candidate
   */
  async update(req, h) {

    let candidateNewDatas = {};

    if (req.payload.firstName) {
      candidateNewDatas.firstName = req.payload.firstName;
    }

    if (req.payload.lastName) {
      candidateNewDatas.lastName = req.payload.lastName;
    }

    if (req.payload.email) {
      candidateNewDatas.email = req.payload.email;
    }

    if (req.payload.company) {
      candidateNewDatas.company = req.payload.company;
    }

    try {
      const candidate = await Candidate.findByIdAndUpdate(req.params.id, candidateNewDatas, {new: true}).exec();

      if (!candidate) {
        return h
          .response({err: 'Candidate not found '})
          .code(404);
      }

      return h
        .response(`${candidate} : updated successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a candidate by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   * @return {*} A success message
   */
  async remove(req, h) {

    try {
      const candidate = await Candidate.findByIdAndRemove(req.params.id, (err, res) => {
        if (err) {
          return h
            .response({err: err})
            .code(500);
        }
      });

      return h
      .response(`Candidate with id : ${req.params.id} correctly suppressed`)
      .code(200);
    } catch (error) {
      throw error;
    }
  }
};