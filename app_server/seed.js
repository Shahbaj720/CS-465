const mongoose = require('mongoose');
const Trip = require('./models/travlr');

const dbURI = 'mongodb://localhost:27017/travlr';

const trips = [
  {
    code: 'GALR',
    name: 'Gale Reef',
    length: '4 nights / 5 days',
    start: new Date('2024-06-01'),
    resort: 'Bhaccasyoniztas Beach Resort',
    perPerson: 599.99,
    image: 'reef1.jpg',
    description: 'Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio.'
  },
  {
    code: 'DAWR',
    name: "Dawson's Reef",
    length: '4 nights / 5 days',
    start: new Date('2024-07-01'),
    resort: 'Bhaccasyoniztas Beach Resort',
    perPerson: 799.99,
    image: 'reef2.jpg',
    description: 'Integer magna leo, posuere et dignissim vitae, porttitor at odio. Pellentesque a metus nec magna placerat volutpat.'
  },
  {
    code: 'CLRR',
    name: "Claire's Reef",
    length: '4 nights / 5 days',
    start: new Date('2024-08-01'),
    resort: 'Bhaccasyoniztas Beach Resort',
    perPerson: 999.99,
    image: 'reef3.jpg',
    description: 'Donec sed felis risus. Nulla facilisi. Donec a orci tellus, et auctor odio. Fusce ac orci nibh, quis semper arcu.'
  }
];

mongoose.connect(dbURI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Trip.deleteMany({});
    console.log('Cleared existing trips');
    await Trip.insertMany(trips);
    console.log('Trips inserted successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log('Error:', err);
  });