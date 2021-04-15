const { toEntity } = require('./transform');

module.exports = ({ model }) => {
  const getAll = (...args) => model.find(...args)
    .then((result) =>
      result.map((data) => toEntity(data))
    );

  const create = (...args) =>
    model.create(...args).then((result) => toEntity(result));

  return {
    getAll,
    create,
  };
};
