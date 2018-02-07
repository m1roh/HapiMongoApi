const bcrypt = require('bcrypt');
const SALT_ROUND = 10;

module.exports = {

  async hashPassword(password) {
    try {
      return await bcrypt.hash(password, SALT_ROUND);
    } catch (error) {
      throw error;
    }
  },

  async comparePassword(password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw error;
    }
  }
};