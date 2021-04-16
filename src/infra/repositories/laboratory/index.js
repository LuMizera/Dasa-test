const { toEntity } = require('./transform');

module.exports = ({ model }) => {
  const paginate = (criteria, options) =>
    model.paginate(criteria, options).then((result) => ({
      ...result,
      docs: result.docs.map((data) => toEntity(data)),
    }));

  const create = (...args) =>
    model.create(...args).then((result) => toEntity(result));

  const insertMany = (...args) =>
    model
      .insertMany(...args)
      .then((result) => result.map((data) => toEntity(data)));

  const findById = (id) =>
    model.findById(id).then((result) => {
      if (!result) {
        return null;
      }

      return toEntity(result);
    });

  const findByIdAndUpdate = (id, data) =>
    model.findByIdAndUpdate(id, data).then((result) => toEntity(result));

  return {
    paginate,
    create,
    findById,
    findByIdAndUpdate,
    insertMany,
  };
};
