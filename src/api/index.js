const express = require('express');

const prima = require('./prima');

const users = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/prime', prima);

router.use('/users', users);

module.exports = router;
