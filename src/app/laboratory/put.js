const { Laboratory } = require('../../domain/laboratory');
const _ = require('lodash');

module.exports = ({ laboratoryRepository }) => {
  const update = ({ id, body }) => {
    console.log({ id, body });

    return Promise.resolve()
      .then(() => laboratoryRepository.findById(id))
      .then((foundLaboratory) => {
        if (!foundLaboratory) {
          throw new Error('Laboratory not found');
        } else if (foundLaboratory.status !== 'active') {
          throw new Error('Cannot edit an inactive Laboratory');
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

  const updateMany = ({ body }) => {
    return Promise.resolve()
      .then(() =>
        body.map((item) => {
          if (!item.id) {
            throw new Error(`Every laboratory needs to have its 'id'`);
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
