const router = require('express').Router();
const { LoginController } = require('../../controller/login');
// const redisAuthClient = require('../../db/redisAuthUserClient');

// individual products routes

router.post('/', async (req, res) => {
  const { body: { usuario, password } } = req;
  try {
    // const response = await redisAuthClient.hget(usuario);
    const response = await LoginController.verifyUser(usuario);
    if (password === response) {
      req.session.usuario = usuario;
      res.send(req.session);
      // res.send(`Hola cliente ${usuario} estas logueado!`);
    } else {
      res.status(401).send('Usuario o contraseña incorrecta');
    }
  } catch (error) {
    res.status(500).response('An error occurred');
  }
});

module.exports = router;
