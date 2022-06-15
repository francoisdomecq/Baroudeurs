//Regarder CrossFeaturing.js pour comprendre le fonctionnement des requêtes

const User = require('../models/User');

exports.createUser = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    typeVisiteur: req.body.typeVisiteur,
    localisation: req.body.localisation,
    cityPicked: req.body.cityPicked,
    score: req.body.score,
    queteEnCours: req.body.queteEnCours,
    queteTerminees: req.body.queteTerminees,
    listeSucces: req.body.listeSucces
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: `${user.name} saved succesfully`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyUser = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    username: req.body.username,
    password: req.body.password,
    typeVisiteur: req.body.typeVisiteur,
    localisation: req.body.localisation,
    cityPicked: req.body.cityPicked,
    score: req.body.score,
    queteEnCours: req.body.queteEnCours,
    queteTerminees: req.body.queteTerminees,
    listeSucces: req.body.listeSucces
  });
  User.updateOne({ _id: req.params.id }, user)
    .then(() => {
      res.status(201).json({
        message: 'Thing updated Usersfully!'
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!'
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getAllUser = (req, res, next) => {
  User.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};
