const { Router } = require('express');
const centennial = require('../centennial.json');
const capilano = require('../capilano.json');
const douglas = require('../douglas.json');
const fanshawe = require('../fanshawe.json');

const routes = new Router();

routes.get('/', (req, res) => {
  const data =  
  [
    centennial,
    fanshawe,
    capilano,
    douglas
  ]
  return res.json(data);
});

routes.get('/institutions/centennial', (req, res) => {
  return res.json(centennial);
});

routes.get('/institutions/capilano', (req, res) => {
  return res.json(capilano);
});

routes.get('/institutions/douglas', (req, res) => {
  return res.json(douglas);
});

routes.get('/institutions/fanshawe', (req, res) => {
  return res.json(fanshawe);
});

module.exports = routes;