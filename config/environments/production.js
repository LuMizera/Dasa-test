module.exports = {
  port: process.env.PORT || 7777,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false,
  },
};
