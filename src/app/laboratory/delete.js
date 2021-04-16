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

  const deactivateMany = ({ body }) => {
    return Promise.resolve()
      .then(() =>
        body.map((item) => {
          return deactivateById({
            id: item,
          });
        })
      )
      .then((unsolvedPromises) => Promise.all(unsolvedPromises))
      .then(() => ({ message: `${body.length} Laboratories deactivated` }))
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    deactivateById,
    deactivateMany,
  };
};
