const Job = require('./job.model');

module.exports = {

  /**
   * Create a candidate
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  create(req, h) {

    const candidateData = {
      firstName: req.payload.firstName,
      lastName: req.payload.lastName,
      email: req.payload.email,
      company: req.payload.company
    };

    return Candidate.create(candidateData).then((candidate) => {
      return h
        .response(`${candidate} : created successfully`)
        .code(200);
    }).catch((err) => {
      return h
        .code(500)
        .response(err);
    });
  },

  /**
   * Find all candidates
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  list(req, h) {

    return Candidate.find({}).exec().then((candidate) => {
      return h
        .response({ candidates: candidate })
        .code(200);
    }).catch((err) => {
      return h
        .response({ err: err })
        .code(500);
    });
  },

  /**
   * Get a single candidate by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  get(req, h) {

    return Candidate.findById(req.params.id).exec().then((candidate) => {
      if (!candidate) {
        return h
          .response('Candidate not found')
          .code(404);
      } else {
        return h
          .response({ candidate: candidate })
          .code(200);
      }
    }).catch((err) => {
      return h
        .response({ err: err })
        .code(500);
    });
  },

  /**
   * Update a candidate by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  update (req, h) {

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

    return Candidate.findByIdAndUpdate(req.params.id, candidateNewDatas, { new: true }).exec().then((candidate) => {
      if (!candidate) {
        return h
          .response({ err: 'Candidate not found ' })
          .code(404);
      }

      return h
        .response(`${candidate} : updated successfully`)
        .code(200);
    }).catch((err) => {
      return h
        .code(500)
        .response(err);
    });
  },

  /**
   * Delete a candidate by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  remove (req, h) {

    Candidate.findByIdAndRemove(req.params.id, (err, res) => {
      if (err) {
        return h
          .response({ err: err })
          .code(500);
      }
    });

    return h
      .response(`Candidate with id : ${req.params.id} correctly suppressed`)
      .code(200);
  }
}