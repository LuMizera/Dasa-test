const { Exam } = require('../../domain/exam');
const _ = require('lodash');

module.exports = ({ examRepository, laboratoryRepository }) => {
  const update = ({ id, body }) => {
    return Promise.resolve()
      .then(() => examRepository.findById(id))
      .then((foundExam) => {
        if (!foundExam) {
          throw new Error('Exam not found');
        }

        let foundLaboratories = [];

        if (body.laboratories) {
          foundLaboratories = body.laboratories.map((laboratoryId) =>
            laboratoryRepository.findById(laboratoryId)
          );
        }

        return { foundExam, foundLaboratories };
      })
      .then(async ({ foundExam, foundLaboratories }) => {
        const resolvedLaboratories = await Promise.all(foundLaboratories);

        for (let laboratory of resolvedLaboratories) {
          if (laboratory.status !== 'active') {
            throw new Error(
              `Cannot associate 'inactive' laboratory '${laboratory.id}' to an exam.`
            );
          }
        }

        return { foundExam, resolvedLaboratories };
      })
      .then(({ foundExam, resolvedLaboratories }) => {
        const updatedExam = _.mergeWith(
          foundExam,
          _.omit(body, ['id', '_id', 'laboratories']),
          { laboratories: resolvedLaboratories },
          (objValue, srcValue) => {
            if (_.isArray(objValue)) {
              return srcValue;
            }
          }
        );

        const exam = Exam(updatedExam);
        return { exam, resolvedLaboratories };
      })
      .then(async ({ exam }) => {
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
            body: _.omit(item, ['id', '_id']),
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
