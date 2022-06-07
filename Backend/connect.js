const mongoose = require('mongoose');

const connect = mongoose
  .connect(
    'mongodb+srv://francoisdmq:mdpHCn6GBK97D6rN@cluster0.xjh8fpr.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = connect;
