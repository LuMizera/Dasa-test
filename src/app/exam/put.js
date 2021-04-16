const { Exam } = require('../../domain/exam');
const _ = require('lodash');

module.exports = ({ examRepository }) => {
  const update = ({ id, body }) => {
    return Promise.resolve()
      .then(() => examRepository.findById(id))
      .then((foundExam) => {
        if (!foundExam) {
          throw new Error('Exam not found');
        }

        const updatedExam = _.merge(
          foundExam,
          _.omit(body, ['id', '_id', 'status'])
        );

        const exam = Exam(updatedExam);

        return exam;
      })
      .then(async (exam) => {
        await examRepository.findByIdAndUpdate(id, exam);
        return exam;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const updateMany = ({ body }) => {
    return Promise.resolve()
      .then(() =>
        body.map((item) => {
          if (!item.id) {
            throw new Error(`Every exam needs to have its 'id'`);
          }

          return update({
            id: item.id,
            body: _.omit(item, ['id', '_id', 'status']),
          });
        })
      )
      .then((updatePromises) => Promise.all(updatePromises))
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    update,
    updateMany,
  };
};
