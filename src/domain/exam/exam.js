const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../helper');
const { structure: LaboratoryStructure } = require('../laboratory');

const Exam = t.struct({
  id: t.maybe(t.String),
  name: t.String,
  type: t.enums({
    analysis: 'analysis',
    clinic: 'clinic',
    image: 'image',
  }),
  laboratories: t.list(t.maybe(LaboratoryStructure)),
  status: t.enums({
    active: 'active',
    inactive: 'inactive',
  }),
});

module.exports = compose(cleanData, Exam);
