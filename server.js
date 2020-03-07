require('express-async-errors');
const CustomError = require('./helpers/CustomError');
const config = require('./config');
const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const cors = require('cors');

const middlewares = require('./middlewares');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const databaseConfig = require('./config/db');

app.use(cors());

middlewares(app);

app.use('/api', routes());

app.use((req, res, next) => {
	const error = new CustomError(`${req.method} to ${req.url} not found`, 404);

	next(error);
});

app.use(errorHandler);

server.listen(config.port, () => {
	console.log(`:: server listening on port ${config.port}`);
	databaseConfig();
});

// server.on('error', (error) => { console.log(`:: error: ${error}`); });
