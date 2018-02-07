const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  }
});

module.exports = mongoose.model('Job', JobSchema);