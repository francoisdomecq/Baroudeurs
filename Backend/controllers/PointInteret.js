//Regarder CrossFeaturing.js pour comprendre le fonctionnement des requêtes

const PointInteret = require('../models/PointInteret');

exports.createPointInteret = (req, res, next) => {
  const pointInteret = new PointInteret({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    color: req.body.color,
    description: req.body.description,
    estPrimordial: req.body.estPrimordial,
    theme: req.body.theme,
    typePI: req.body.typePI,
    img: req.body.img,
    imgMarker: req.body.imgMarker,
    histoire: req.body.histoire
  });
  pointInteret
    .save()
    .then(() => {
      res.status(201).json({
        message: `${pointInteret.name} saved succesfully`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOnePointInteret = (req, res, next) => {
  PointInteret.findOne({
    _id: req.params.id
  })
    .then((pointInteret) => {
      res.status(200).json(pointInteret);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyPointInteret = (req, res, next) => {
  const pointInteret = new PointInteret({
    _id: req.params.id,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    color: req.body.color,
    description: req.body.description,
    estPrimordial: req.body.estPrimordial,
    theme: req.body.theme,
    typePI: req.body.typePI,
    img: req.body.img,
    imgMarker: req.body.imgMarker,
    histoire: req.body.histoire
  });
  PointInteret
    .updateOne({ _id: req.params.id }, pointInteret)
    .then(() => {
      res.status(201).json({
        message: `${pointInteret.name} updated successfully!`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.deletePointInteret = (req, res, next) => {
  PointInteret.deleteOne({ _id: req.params.id })
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

exports.getAllPointInteret = (req, res, next) => {
  PointInteret.find()
    .then((pointInteret) => {
      res.status(200).json(pointInteret);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};
