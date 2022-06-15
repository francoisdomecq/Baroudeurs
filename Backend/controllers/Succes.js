//Regarder CrossFeaturing.js pour comprendre le fonctionnement des requêtes

const Succes = require('../models/Succes');

exports.createSucces = (req, res, next) => {
  const succes = new Succes({
    name: req.body.name,
    icon: req.body.icon
  });
  succes
    .save()
    .then(() => {
      res.status(201).json({
        message: `${succes.name} saved succesfully`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneSucces = (req, res, next) => {
  Succes.findOne({
    _id: req.params.id
  })
    .then((succes) => {
      res.status(200).json(succes);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifySucces = (req, res, next) => {
  const succes = new Succes({
    _id: req.params.id,
    name: req.body.name,
    icon: req.body.icon
  });
  Succes.updateOne({ _id: req.params.id }, succes)
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

exports.deleteSucces = (req, res, next) => {
  Succes.deleteOne({ _id: req.params.id })
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

exports.getAllSucces = (req, res, next) => {
  Succes.find()
    .then((succes) => {
      res.status(200).json(succes);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};
