const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../helper');

const Laboratory = t.struct({
  id: t.maybe(t.String),
  name: t.String,
  type: t.enums({
    analysis: 'analysis',
    clinic: 'clinic',
    image: 'image',
  }),
  status: t.enums({
    active: 'active',
    inactive: 'inactive',
  }),
});

module.exports = compose(cleanData, Laboratory);
