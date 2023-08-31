module.exports = (anyAsyncFunction) => async (req, res, next) => {
  try {
    await anyAsyncFunction(req, res, next);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }

    next(error);
    return error;
  }
};