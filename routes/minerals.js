var express = require('express');
var router = express.Router();
var models = require('../models');

var middlewares = require('./middlewares');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Mineral.findAll().then(function(minerals){
    res.json(minerals);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.post('/', middlewares.hasRole('mineralAdmin'), function(req, res){
  var mineral = req.body;
  mineral.user_id = req.session.user.id;
  models.Mineral.create(mineral).then(function(mineral){
    res.json(mineral);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.delete('/:id', middlewares.hasRole('mineralAdmin'), function(req, res){
  models.Mineral.destroy({where: {id: req.params.id}}).then(function(result){
    res.json(result);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.put('/:id', middlewares.hasRole('mineralAdmin'), function(req, res){
  models.Mineral.update(req.body, {where: {id: req.params.id}, returning: true}).then(function(result){
    res.json(result[1][0]);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

module.exports = router;
