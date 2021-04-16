const container = require('../../../../container');
const { get, post, put, remove } = require('../../../../app/exam');

module.exports = () => {
  const {
    repository: { examRepository, laboratoryRepository },
  } = container.cradle;

  const getUseCase = get({ examRepository });
  const postUseCase = post({ examRepository });
  const putUseCase = put({ examRepository, laboratoryRepository });
  const removeUseCase = remove({ examRepository });

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    removeUseCase,
  };
};
