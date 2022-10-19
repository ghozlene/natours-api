const exp = require('constants');
const express = require('express');
const fs = require('fs');

app = express();
app.use(express.json());
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

app.post('/api/v1/tours', (req, res, next) => {
  const newId = parseInt(tours[tours.length - 1].id) + 1;
  console.log(tours.length - 1);
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => console.log(err)
  );

  res.status(201).send({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

const port = 3000;

app.listen(port, () => {
  console.log('app running on port', port);
});
