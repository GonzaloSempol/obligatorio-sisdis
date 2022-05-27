const express = require('express');

const apiRouter = express.Router();
// const { authenticate, session } = require('../middleware');
const { session } = require('../middleware');
const loginRouter = require('./login');
const voteRouter = require('./vote');

const makeAuthRouter = () => {
  const routes = [
    ['/vote', voteRouter],
  ];
  const router = express.Router();

  routes.forEach(([path, nestedRouter]) => {
    // router.use(path, session, authenticate(), nestedRouter);
    router.use(path, session, nestedRouter);
  });

  return router;
};
const makeBasicRouter = () => {
  const routes = [
    ['/login', loginRouter],
  ];
  const router = express.Router();

  routes.forEach(([path, nestedRouter]) => {
    router.use(path, session, nestedRouter);
  });

  return router;
};

apiRouter.use(makeBasicRouter());
apiRouter.use(makeAuthRouter());
apiRouter.get('/ping', (req, res) => res.send('pong'));
// las rutas debajo de esta están protegidas
// Solo pueden ser accedidas por usuarios logueados.

module.exports = apiRouter;
