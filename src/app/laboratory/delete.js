const _ = require('lodash');

module.exports = ({ laboratoryRepository }) => {
  const inactiveById = ({ id }) => {
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
      .then(() => ({ message: 'Laboratory inactivated' }))
      .catch((error) => {
        throw new Error(error);
      });
  };
  return {
    inactiveById,
  };
};
