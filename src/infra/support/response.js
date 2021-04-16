const { assoc } = require('ramda');

module.exports = () => {
  const defaultResponse = (success = true) => {
    return {
      success,
    };
  };

  const Success = (data) => {
    return assoc('data', data, defaultResponse(true));
  };

  const Fail = (data) => {
    return assoc('error', data, defaultResponse(false));
  };

  return {
    Success,
    Fail,
  };
};
