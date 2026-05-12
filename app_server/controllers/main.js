const index = (req, res) => {
  res.render('index');
};

const travel = (req, res) => {
  res.render('travel');
};

module.exports = { index, travel };