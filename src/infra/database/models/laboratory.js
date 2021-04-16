const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ['analysis', 'clinic', 'image'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

schema.plugin(mongoosePaginate);

module.exports = model('exams', schema);
