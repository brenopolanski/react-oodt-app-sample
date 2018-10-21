const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fetch = require('isomorphic-unfetch');
const app = express();
const port = 9999;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/oodt', (req, res) => {
  fetch('http://46.4.26.22:8012/fmprod/jaxrs/product?productId=ce4380c5-d0d2-11e8-89ca-971c29fc9f21', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(r => r.json())
  .then(data => {
    res.send({ 'product': data.product });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
