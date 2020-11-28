const express = require('express');

const prima = require('./prima');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/prime', prima);

module.exports = router;
