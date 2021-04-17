const _ = require('lodash');

const queryToMongo = require('query-to-mongo');

module.exports = ({ examRepository }) => {
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
        examRepository.paginate(
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
      .then(() => examRepository.findById(id))
      .then((foundExam) => {
        if (!foundExam) {
          throw new Error('Exam not found');
        }

        return foundExam;
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
