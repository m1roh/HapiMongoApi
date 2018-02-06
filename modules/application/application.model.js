const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicaitonSchema = new Schema({
  hired: Boolean,
});

module.exports = mongoose.model('Application', ApplicaitonSchema);