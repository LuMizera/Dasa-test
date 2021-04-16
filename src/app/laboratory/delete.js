const _ = require('lodash');

module.exports = ({ laboratoryRepository }) => {
  const deactivateById = ({ id }) => {
    return Promise.resolve()
      .then(() => laboratoryRepository.findById(id))
      .then((foundLaboratory) => {
        if (!foundLaboratory) {
          throw new Error('Laboratory not found');
        }

        const inactiveLaboratory = _.merge(foundLaboratory, {
          status: 'inactive',
        });

        return inactiveLaboratory;
      })
      .then((inactiveLaboratory) =>
        laboratoryRepository.findByIdAndUpdate(id, inactiveLaboratory)
      )
      .then(() => ({ message: 'Laboratory deactivated' }))
      .catch((error) => {
        throw new Error(error);
      });
  };
  return {
    deactivateById,
  };
};
