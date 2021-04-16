const _ = require('lodash');

module.exports = ({ examRepository }) => {
  const deactivateById = ({ id }) => {
    return Promise.resolve()
      .then(() => examRepository.findById(id))
      .then((foundExam) => {
        if (!foundExam) {
          throw new Error('Exam not found');
        }

        const inactiveExam = _.merge(foundExam, {
          status: 'inactive',
        });

        return inactiveExam;
      })
      .then((inactiveExam) =>
        examRepository.findByIdAndUpdate(id, inactiveExam)
      )
      .then(() => ({ message: 'Exam inactivated' }))
      .catch((error) => {
        throw new Error(error);
      });
  };
  return {
    deactivateById,
  };
};
