const router = require('express').Router();
const userRoutes = require('./userRoutes');

module.exports = function (app) {
  router.get('/test', (req, res) => {
    res.send("yehh!")
  })
  router.use('/users', userRoutes())

  return router;
}
