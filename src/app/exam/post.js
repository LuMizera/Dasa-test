const { Exam } = require('../../domain/exam');

module.exports = ({ examRepository }) => {
  const create = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        if (!body.status) {
          body.status = 'active';
        }

        const exam = Exam(body);

        return examRepository.create(exam);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    create,
  };
};
