const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
const db = require('./app_server/db');

const app = express();
const PORT = 3000;

// Connect to database
db.connect();

// Set up Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON
app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});

module.exports = app;