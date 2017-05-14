var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var middlewares = require('./middlewares');
router.use('/', middlewares.hasRole('pageAdmin'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll({
    attributes: { exclude: ['password'] },
    include:[{
      model: models.Role,
      as: 'Role',
      attributes: ['id']
    }]
  }).then(function(users){
    res.json(users);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.post('/', function(req, res){
  var user = req.body;
  user.password = bcrypt.hashSync(user.password, salt);
  models.User.create(user).then(function(user){
    res.json(user);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.post('/:id/setRoles', function(req, res){
  models.User.findById(req.params.id).then(function(user){
    return user.setRole(req.body.roles);
  }).then(function(result){
    res.json(result);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.delete('/:id', function(req, res){
  models.User.destroy({where: {id: req.params.id}}).then(function(result){
    res.json(result);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.put('/:id', function(req, res){
  var user = req.body;
  if(user.password)
    user.password = bcrypt.hashSync(user.password, salt);
  models.User.update(user, {where: {id: req.params.id}, returning: true}).then(function(result){
    res.json(result[1][0]);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

module.exports = router;
