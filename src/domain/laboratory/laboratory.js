const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../helper');

const Laboratory = t.struct({
  id: t.maybe(t.String),
  name: t.String,
  address: t.String,
  status: t.enums({
    active: 'active',
    inactive: 'inactive',
  }),
});

module.exports = {
  Laboratory: compose(cleanData, Laboratory),
  structure: Laboratory,
};
