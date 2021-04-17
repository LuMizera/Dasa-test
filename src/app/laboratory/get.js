const _ = require('lodash');

const queryToMongo = require('query-to-mongo');

module.exports = ({ laboratoryRepository }) => {
  const paginate = (req) => {
    const { criteria, options } = queryToMongo(req.query);

    if (criteria) {
      if (!criteria.status) {
        criteria.status = 'active';
      }

      if (criteria.page) {
        options.page = criteria.page;
      }
    }

    return Promise.resolve()
      .then(() =>
        laboratoryRepository.paginate(
          _.omit(criteria, ['page']),
          _.omit(options, ['fields'])
        )
      )
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
    paginate,
    byId,
  };
};
