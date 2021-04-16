const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

schema.plugin(mongoosePaginate);

module.exports = model('laboratories', schema);
