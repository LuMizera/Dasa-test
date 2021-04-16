const queryToMongo = require('query-to-mongo');

module.exports = ({ examRepository }) => {
  const paginate = (req) => {
    const { criteria, options } = queryToMongo(req.query);

    if (criteria && !criteria.status) {
      criteria.status = 'active';
    }

    return Promise.resolve()
      .then(() => examRepository.getAll(criteria, options))
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
