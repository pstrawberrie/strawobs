/**
 * Node Server
 */
const config = require('./config');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const routes = require('./routes');

const errorHandlers = require('./handlers/errorHandlers');

// Middlewares
app.use(helmet());
app.use(compression({}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Locals
app.use((req, res, next) => {
  next();
});

// Configured Routes
app.use('/', routes);

// Error Handling Routes
app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

// Start Server
app.listen(config.webPort, () => {
  console.log(chalk.cyan(`+++ Web Server Started on localhost:${config.webPort} +++`));
});
