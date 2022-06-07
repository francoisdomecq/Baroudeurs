//Regarder CrossFeaturing.js pour comprendre le fonctionnement des requêtes

const City = require('../models/City');

exports.createCity = (req, res, next) => {
  const city = new City({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    polygon: req.body.polygon
  });
  city
    .save(JSON.stringify(city))
    .then(() => {
      res.status(201).json({
        message: `${city.nom} saved succesfully`
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getOneCity = (req, res, next) => {
  City.findOne({
    _id: req.params.id
  })
    .then((city) => {
      res.status(200).json(city);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyCity = (req, res, next) => {
  const city = new City({
    _id: req.params.id,
    nom: req.body.nom
  });
  city
    .updateOne({ _id: req.params.id }, city)
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

exports.deleteCity = (req, res, next) => {
  City.deleteOne({ _id: req.params.id })
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

exports.getAllCity = (req, res, next) => {
  City.find()
    .then((city) => {
      res.status(200).json(city);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};
