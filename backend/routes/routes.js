const express = require('express');
const parseData = require('../parseData');
// const {parseData, appendData} = require('../parseData');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('API Version 1');

});

router.post('/data', async(req, res) => {
	let data = await parseData.parseData()
	res.send(JSON.stringify(data));
});

router.post('/sendData', async(req, res) => {
	let data = req.body['data'];
	parseData.appendData(data);
});

module.exports = router;