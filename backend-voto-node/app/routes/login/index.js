const router = require('express').Router();

// individual products routes

router.post('/', (req, res) => {
  req.session.cliente = 'CLIENTE!';
  res.send('Hola Cliente! estás logueado!');
});

module.exports = router;
