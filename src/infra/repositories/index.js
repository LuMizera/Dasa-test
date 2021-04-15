const Laboratory = require('./laboratory');

module.exports = ({ database }) => {
  const laboratoryModel = database.models.laboratories;

  return {
    laboratoryRepository: Laboratory({ model: laboratoryModel }),
  };
};
