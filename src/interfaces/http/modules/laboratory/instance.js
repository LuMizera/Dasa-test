const container = require('../../../../container');
const { get, post, put, remove } = require('../../../../app/laboratory');

module.exports = () => {
  const {
    repository: { laboratoryRepository },
  } = container.cradle;

  const getUseCase = get({ laboratoryRepository });
  const postUseCase = post({ laboratoryRepository });
  const putUseCase = put({ laboratoryRepository });
  const removeUseCase = remove({ laboratoryRepository });

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    removeUseCase,
  };
};
