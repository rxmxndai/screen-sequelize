module.exports = (anyAsyncFunction) => async (req, res, next) => {
  try {
    await anyAsyncFunction(req, res, next);
  } catch (error) {
    next(error);
  }
};