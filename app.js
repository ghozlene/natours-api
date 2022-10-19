const express = require('express');
const fs = require('fs');

app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    tours,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log('app running on port', port);
});
