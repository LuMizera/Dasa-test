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

  return {
    create,
  };
};
