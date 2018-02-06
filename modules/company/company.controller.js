const Company = require('./company.model');

module.exports = {

  /**
   * Create a company
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  async create(req, h) {

    const companyData = {
      name: req.payload.name,
      city: req.payload.city,
      address: req.payload.address
    };

    try {
      const company = await Company.create(companyData);

      return h
        .response(`${company} : created successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find all companies
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  async list(req, h) {

    try {
      const company = await Company.find({})
        .populate('candidates')
        .populate('jobs')
        .exec();

      return h
        .response({ companies: company })
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single company by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  async get(req, h) {

    try {
      const company = await Company.findById(req.params.id).exec();

      if (!company) {
        return h
          .response('Company not found')
          .code(404);
      }

      return h
        .response({ company: company })
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a company by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  async update(req, h) {

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

    try {
      const company = await Company.findByIdAndUpdate(req.params.id, companyNewDatas, { new: true }).exec();

      if (!company) {
        return h
          .response({ err: 'Company not found ' })
          .code(404);
      }

      return h
        .response(`${company} : updated successfully`)
        .code(200);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a company by id
   * @param {*} req The request object
   * @param {*} h The handler interface
   */
  async remove(req, h) {

    try {
      const company = await Company.findByIdAndRemove(req.params.id, (err, res) => {
        if (err) {
          return h
            .response({ err: err })
            .code(500);
        }
      });

      return h
        .response(`Company with id : ${req.params.id} correctly suppressed`)
        .code(200);
    } catch (error) {
      throw error;
    }
  }
}