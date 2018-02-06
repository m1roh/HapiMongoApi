const Company = require('./company.model');

module.exports = {

  /**
   * Create a company
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  create(req, h) {

    const companyData = {
      name: req.payload.name,
      city: req.payload.city,
      address: req.payload.address
    };

    return Company.create(companyData).then((company) => {
      return h
        .response(`${company} : created successfully`)
        .code(200);
    }).catch((err) => {
      return h
        .code(500)
        .response(err);
    });
  },

  /**
   * Find all companies
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  list(req, h) {

    return Company.find({}).populate('candidates').exec().then((company) => {
      return h
        .response({ companies: company })
        .code(200);
    }).catch((err) => {
      return h
        .response({ err: err })
        .code(500);
    });
  },

  /**
   * Get a single company by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  get(req, h) {

    return Company.findById(req.params.id).exec().then((company) => {
      if (!company) {
        return h
          .response('Company not found')
          .code(404);
      } else {
        return h
          .response({ company: company })
          .code(200);
      }
    }).catch((err) => {
      return h
        .response({ err: err })
        .code(500);
    });
  },

  /**
   * Update a company by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  update (req, h) {

    let companyNewDatas = {};

    if (req.payload.name) {
      companyNewDatas.name = req.payload.name;
    }

    if (req.payload.city) {
      companyNewDatas.city = req.payload.city;
    }

    if (req.payload.address) {
      companyNewDatas.address = req.payload.address;
    }

    return Company.findByIdAndUpdate(req.params.id, companyNewDatas, { new: true }).exec().then((company) => {
      if (!company) {
        return h
          .response({ err: 'Company not found ' })
          .code(404);
      }

      return h
        .response(`${company} : updated successfully`)
        .code(200);
    }).catch((err) => {
      return h
        .code(500)
        .response(err);
    });
  },

  /**
   * Delete a company by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  remove (req, h) {

    Company.findByIdAndRemove(req.params.id, (err, res) => {
      if (err) {
        return h
          .response({ err: err })
          .code(500);
      }
    });

    return h
      .response(`Company with id : ${req.params.id} correctly suppressed`)
      .code(200);
  }
}