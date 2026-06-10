const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const cors = require('cors');
const passport = require('passport');

const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
const db = require('./app_server/db');
require('./app_api/config/passport');

const app = express();
const PORT = 3000;

db.connect();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});

module.exports = app;
