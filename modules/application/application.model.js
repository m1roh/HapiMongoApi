const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicaitonSchema = new Schema({
  hired: Boolean,

  candidate: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Candidate'
  },
  job: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Job'
  }
});

module.exports = mongoose.model('Application', ApplicaitonSchema);