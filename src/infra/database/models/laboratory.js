const {Schema, model} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active','inactive'],
    default: 'active',
  },
});


module.exports = model('laboratories', schema);
