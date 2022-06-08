//Regarder CrossFeaturing.js pour comprendre le fonctionnement des requêtes

const Quartier = require('../models/Quartier');

exports.createQuartier = (req, res, next) => {
  const quartier = new Quartier({
    name: req.body.name,
    polygon: req.body.polygon,
    listePi: req.body.listePi
  });
  quartier
    .save()
    .then(() => {
      res.status(201).json({
        message: `${quartier.name} saved succesfully`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneQuartier = (req, res, next) => {
  Quartier.findOne({
    _id: req.params.id
  })
    .then((quartier) => {
      res.status(200).json(quartier);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyQuartier = (req, res, next) => {
  const quartier = new Quartier({
    _id: req.params.id,
    name: req.body.name,
    polygon: req.body.polygon,
    listePi: req.body.listePi
  });
  Quartier.updateOne({ _id: req.params.id }, quartier)
    .then(() => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.deleteQuartier = (req, res, next) => {
  Quartier.deleteOne({ _id: req.params.id })
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

exports.getAllQuartier = (req, res, next) => {
  Quartier.find()
    .then((quartier) => {
      res.status(200).json(quartier);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};
