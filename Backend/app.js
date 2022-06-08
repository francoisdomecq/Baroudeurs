const express = require('express');
const mongoose = require('mongoose');
const connect = require('./connect');
const { setMaxListeners } = require('./models/City');

const CityRoutes = require('./routes/City');
<<<<<<< HEAD
const PIRoutes = require('./routes/PointInteret');
=======

>>>>>>> 0bd289abe59e0d1c46fd417e5930a1cd298ee9d4
const app = express();

//Middleware pour gérer le système de sécurité CORS qui bloque les appels HTTP entre des serveurs différents.
app.use((req, res, next) => {
  //Permet d'accéder à l'API depuis n'importe quel origine
  res.setHeader('Access-Control-Allow-Origin', '*');

  //Ajoute les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  //Permet d'envoyer des requêtes
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use('/api/city', CityRoutes);
app.use('/api/pointinteret', PIRoutes);

module.exports = app;
