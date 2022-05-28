const router = require('express').Router();

// individual products routes

router.get('/', (req, res) => {
  res.send('Hola! Votar!');
});

module.exports = router;
