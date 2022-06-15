const express = require('express');
const mongoose = require('mongoose');
const connect = require('./connect');
const { setMaxListeners } = require('./models/City');

const CityRoutes = require('./routes/City');
const PIRoutes = require('./routes/PointInteret');
const QuartierRoutes = require('./routes/Quartier');
const QueteRoutes = require('./routes/Quete');
const UserRoutes = require('./routes/User');
const SuccesRoutes = require('./routes/Succes');
const JournalRoutes = require('./routes/Journal');

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
app.use('/api/quartiers', QuartierRoutes);
app.use('/api/quetes', QueteRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/succes', SuccesRoutes);
app.use('/api/journal', JournalRoutes);

module.exports = app;
