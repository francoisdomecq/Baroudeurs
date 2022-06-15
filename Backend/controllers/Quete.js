//Regarder CrossFeaturing.js pour comprendre le fonctionnement des requêtes

const Quete = require('../models/Quete');

exports.createQuete = (req, res, next) => {
  const quete = new Quete({
    name: req.body.name,
    preview: req.body.preview,
    description: req.body.description,
    image: req.body.image,
    listePI: req.body.listePI,
    progession: req.body.progession,
    score: req.body.score,
    succes: req.body.succes
  });
  quete
    .save()
    .then(() => {
      res.status(201).json({
        message: `${quete.name} saved succesfully`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneQuete = (req, res, next) => {
  Quete.findOne({
    _id: req.params.id
  })
    .then((quete) => {
      res.status(200).json(quete);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyQuete = (req, res, next) => {
  const quete = new Quete({
    _id: req.params.id,
    name: req.body.name,
    preview: req.body.preview,
    description: req.body.description,
    image: req.body.image,
    listePI: req.body.listePI,
    progession: req.body.progession,
    score: req.body.score,
    succes: req.body.succes
  });
  Quete.updateOne({ _id: req.params.id }, quete)
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

exports.deleteQuete = (req, res, next) => {
  Quete.deleteOne({ _id: req.params.id })
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

exports.getAllQuete = (req, res, next) => {
  Quete.find()
    .then((quete) => {
      res.status(200).json(quete);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};
