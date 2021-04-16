const { Laboratory } = require('../../domain/laboratory');
const _ = require('lodash');

module.exports = ({ laboratoryRepository }) => {
  const update = ({ id, body }) => {
    return Promise.resolve()
      .then(() => laboratoryRepository.findById(id))
      .then((foundLaboratory) => {
        if (!foundLaboratory) {
          throw new Error('Laboratory not found');
        }

        const updatedLaboratory = _.merge(
          foundLaboratory,
          _.omit(body, ['id', '_id', 'status'])
        );

        const laboratory = Laboratory(updatedLaboratory);

        return laboratory;
      })
      .then(async (laboratory) => {
        await laboratoryRepository.findByIdAndUpdate(id, laboratory);
        return laboratory;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    update,
  };
};
