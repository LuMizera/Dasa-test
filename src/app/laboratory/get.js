var queryToMongo = require('query-to-mongo');

module.exports = ({ laboratoryRepository }) => {
  const all = (req) => {
    const { criteria, options } = queryToMongo(req.query);

    if (criteria && !criteria.status) {
      criteria.status = 'active';
    }

    return Promise.resolve()
      .then(() => laboratoryRepository.getAll(criteria, options))
      .catch((error) => {
        throw new Error(error);
      });
  };

  const byId = ({ id }) => {
    return Promise.resolve()
      .then(() => laboratoryRepository.findById(id))
      .then((foundLaboratory) => {
        if (!foundLaboratory) {
          throw new Error('Laboratory not found');
        }

        return foundLaboratory;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    all,
    byId,
  };
};
