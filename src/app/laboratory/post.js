const { Laboratory } = require('../../domain/laboratory');

module.exports = ({ laboratoryRepository }) => {
  const create = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        if (!body.status) {
          body.status = 'active';
        }

        const laboratory = Laboratory(body);

        return laboratoryRepository.create(laboratory);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const createMany = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        const laboratoryEntities = body.map((item) => {
          if (!item.status) {
            item.status = 'active';
          }

          const laboratory = Laboratory(item);
          return laboratory;
        });

        return laboratoryRepository.insertMany(laboratoryEntities);
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
