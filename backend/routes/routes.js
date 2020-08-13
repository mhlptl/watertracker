const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('API Version 1');
});

module.exports = router;