module.exports = ({ laboratoryRepository }) => {
  const all = () =>
    Promise.resolve()
      .then(() => laboratoryRepository.getAll())
      .catch((error) => {
        throw new Error(error);
      });

  return {
    all,
  };
};
