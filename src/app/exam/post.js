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

  const createMany = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        const examEntities = body.map((item) => {
          if (!item.status) {
            item.status = 'active';
          }

          const exam = Exam(item);
          return exam;
        });

        return examRepository.insertMany(examEntities);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    create,
    createMany,
  };
};
