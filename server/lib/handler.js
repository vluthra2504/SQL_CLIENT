const {
  errors: { ApiError },
  log,
} = require("../utils");

module.exports = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn.bind(this)(req, res, next))
      .then((result) => {
        if (result instanceof Error) return Promise.reject(result);
        res.json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        log("arctype:error-handler")(err, err.stack);
        if (err instanceof ApiError) {
          res.status(200).json({
            message: err.message,
          });
        } else {
          if (err.response) {
            res.status(200).send({
              success: false,
              data: {
                message: err.response.data.error_description,
              },
            });
          } else if (err.status) {
            res.status(200).send({
              success: false,
              data: err,
            });
          } else {
            res.status(200).send({
              success: false,
              data: {
                message: err.message,
              },
            });
          }
        }
      });
  };
};
