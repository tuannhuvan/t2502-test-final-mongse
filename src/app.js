const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/admin');

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use(routes);

app.use((req, res) => res.status(404).send('Not found'));

module.exports = app;