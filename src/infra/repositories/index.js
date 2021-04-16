const Laboratory = require('./laboratory');
const Exam = require('./exam');

module.exports = ({ database }) => {
  const laboratoryModel = database.models.laboratories;
  const examModel = database.models.exams;

  return {
    laboratoryRepository: Laboratory({ model: laboratoryModel }),
    examRepository: Exam({ model: examModel }),
  };
};
