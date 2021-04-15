module.exports = ({ server, database }) => {
  return {
    start: () => Promise.resolve().then(database.connect).then(server.start),
  };
};
