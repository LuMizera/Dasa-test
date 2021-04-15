const container = require('../../../../container');
const { get, post } = require('../../../../app/laboratory');

module.exports = () => {
  const {
    repository: { laboratoryRepository },
  } = container.cradle;

  const getUseCase = get({ laboratoryRepository });
  const postUseCase = post({ laboratoryRepository });

  return {
    getUseCase,
    postUseCase,
  };
};
