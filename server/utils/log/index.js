const debug = require("debug");
const bunyan = require("bunyan");
const { LoggingBunyan } = require("@google-cloud/logging-bunyan");

let bunyanLogger; // resuable scope

module.exports = (component) => {
  const logger = (level, main, ...args) => {
    if (process.env.NODE_ENV === "production") {
      if (!bunyanLogger) {
        bunyanLogger = bunyan.createLogger({
          name: "arctype",
          streams: [
            { stream: process.stdout, level: "info" },
            new LoggingBunyan().stream("info"),
          ],
        });
      }
      bunyanLogger[level]({ name: component }, main);
      args.forEach((arg) => bunyanLogger[level]({ name: component }, arg));
    } else {
      debug(component).apply(null, [main].concat(args));
    }
  };

  const wrapper = (...args) => logger.apply(null, ["info"].concat(args));
  Object.values(bunyan.nameFromLevel).forEach((level) => {
    wrapper[level] = (...args) => logger.apply(null, [level].concat(args));
  });
  return wrapper;
};
