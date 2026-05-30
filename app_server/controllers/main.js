const Trip = require('../models/travlr');

const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

const travel = (req, res) => {
  Trip.find({})
    .then(trips => {
      res.render('travel', {
        title: 'Travlr Getaways - Travel',
        trips: trips
      });
    })
    .catch(err => {
      console.log('Error fetching trips:', err);
      res.status(500).send('Error fetching trips');
    });
};

module.exports = { index, travel };