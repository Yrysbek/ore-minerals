var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcryptjs');

router.post('/signin', function (req, res) {
  models.User.findOne({
    where: {login: req.body.login},
    include: [{
      model: models.Role,
      as: 'Role'
    }],
    logging: console.log
  }).then(function(user){
    if(user && bcrypt.compareSync(req.body.password, user.password)){
      var roles = [];
      for(var key in user.Role){
        roles.push(user.Role[key].name);
      }
      req.session.user = {
        id: user.id,
        login: user.login,
        firstname: user.firstname,
        lastname: user.lastname,
        roles: roles
      };
      res.json({status: 'success'});
    } else {
      res.status(400).json({message: 'Неправильный логин или пароль!'});
    }
  }).catch(function(error){
    console.log(error);
    res.status(400).json(error);
  });
});
router.get('/auth', function (req, res) {
    res.render('auth.html', {title: 'Авторизация', session: req.session});
});
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
