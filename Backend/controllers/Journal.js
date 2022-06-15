//Regarder CrossFeaturing.js pour comprendre le fonctionnement des requêtes

const Journal = require('../models/Journal');

exports.createJournal = (req, res, next) => {
  const journal = new Journal({
    user: req.body.user,
    ville: req.body.ville,
    pointInteret: req.body.pointInteret
  });
  journal
    .save()
    .then(() => {
      res.status(201).json({
        message: `${journal.name} saved succesfully`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneJournal = (req, res, next) => {
  Journal.findOne({
    _id: req.params.id
  })
    .then((journal) => {
      res.status(200).json(journal);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyJournal = (req, res, next) => {
  const journal = new Journal({
    _id: req.params.id,
    user: req.body.user,
    ville: req.body.ville,
    pointInteret: req.body.pointInteret
  });
  Journal.updateOne({ _id: req.params.id }, journal)
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

exports.deleteJournal = (req, res, next) => {
  Journal.deleteOne({ _id: req.params.id })
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

exports.getAllJournal = (req, res, next) => {
  Journal.find()
    .then((journal) => {
      res.status(200).json(journal);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};
