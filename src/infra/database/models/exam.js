const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAutoPopulate = require('mongoose-autopopulate');

const schema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  type: {
    type: String,
    enum: ['analysis', 'clinic', 'image'],
  },
  laboratories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'laboratories',
      autopopulate: true,
    },
  ],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseAutoPopulate);

module.exports = model('exams', schema, 'Exam');
