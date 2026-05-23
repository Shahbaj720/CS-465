const fs = require('fs');
const path = require('path');

const trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/trips.json'), 'utf8')
);

const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

const travel = (req, res) => {
  res.render('travel', { 
    title: 'Travlr Getaways - Travel',
    trips: trips 
  });
};

module.exports = { index, travel };