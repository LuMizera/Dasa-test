const { Exam } = require('../../domain/exam');

module.exports = ({ examRepository }) => {
  const create = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        const mergedBody = {
          status: 'active',
          laboratories: [],
          ...body,
        };

        const exam = Exam(mergedBody);

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
          const mergedBody = {
            status: 'active',
            laboratories: [],
            ...item,
          };

          const exam = Exam(mergedBody);
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
