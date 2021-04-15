module.exports = ({ laboratoryRepository }) => {
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        laboratoryRepository.getAll()
      )
      .catch(error => {
        throw new Error(error);
      });
  };

  return {
    all,
  };
};
