require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();
const port = 5000;

const indexRouter = require('./routes/routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1', indexRouter);

app.get('*', (req, res) => {
	res.status(404).send('Page Does Not Exist');
})

app.listen(port, () => {
	console.log('server is running');
});

module.exports = app;