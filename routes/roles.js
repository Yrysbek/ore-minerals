var express = require('express');
var router = express.Router();
var models = require('../models');

var middlewares = require('./middlewares');
router.use('/', middlewares.hasRole('pageAdmin'));

router.get('/', function(req, res, next) {
  models.Role.findAll().then(function(roles){
    res.json(roles);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.post('/', function(req, res){
  var role = req.body;
  models.Role.create(role).then(function(role){
    res.json(role);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.delete('/:id', function(req, res){
  models.Role.destroy({where: {id: req.params.id}}).then(function(result){
    res.json(result);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.put('/:id', function(req, res){
  models.Role.update(req.body, {where: {id: req.params.id}, returning: true}).then(function(result){
    res.json(result[1][0]);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

module.exports = router;
