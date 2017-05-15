var express = require('express');
var router = express.Router();
var models = require('../models');

var middlewares = require('./middlewares');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var itemsPerPage = 9;
  var pageCount = 0;
  models.Mineral.count().then(function(mineralsCount){
    pageCount = Math.ceil(mineralsCount / itemsPerPage);
    return models.Mineral.findAll({
      include: [{
        model: models.MineralClass,
        as: "MineralClass"
      }, {
        model: models.MineralImage,
        as: "MineralImage"
      }],
      limit: itemsPerPage,
      offset: (req.query.page-1) * itemsPerPage
    });
  }).then(function(minerals){
    var result = {pageCount: pageCount, rows: minerals};
    res.json(result);
  }).catch(function(error){
    console.log(error);
    res.status(400).json({message: error});
  });
});

router.post('/', middlewares.hasRole('mineralsAdmin'), function(req, res){
  var mineral = req.body;
  mineral.user_id = req.session.user.id;
  models.Mineral.create(mineral).then(function(mineral){
    res.json(mineral);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.delete('/:id', middlewares.hasRole('mineralsAdmin'), function(req, res){
  models.Mineral.destroy({where: {id: req.params.id}}).then(function(result){
    res.json(result);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.put('/:id', middlewares.hasRole('mineralsAdmin'), function(req, res){
  models.Mineral.update(req.body, {where: {id: req.params.id}, returning: true}).then(function(result){
    res.json(result[1][0]);
  }).catch(function(error){
    res.status(400).json({message: error});
  });
});

router.post('/:id/uploadImage', middlewares.hasRole('mineralsAdmin'), function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let image = req.files.image;

  var fs = require('fs');
  var publicDir = __dirname + '/../public';
  var dir = '/uploads/minerals/'+req.params.id;

  if (!fs.existsSync(publicDir + dir)){
     fs.mkdirSync(publicDir + dir);
  }

  // Use the mv() method to place the file somewhere on your server
  var date = new Date();
  var imageUrl = dir + '/' + date.getTime() + '.' + req.files.image.name.split('.').pop();
  image.mv(publicDir + imageUrl, function(err) {
    if (err)
      return res.status(500).send(err);

    models.MineralImage.create({
      filename: req.files.image.name,
      url: imageUrl,
      description: req.body.description,
      mineral_id: req.params.id
    }).then(function(image){
      return res.json(image);
    }).catch(function(err){
      return res.status(400).json(err);
    })
  });
});

module.exports = router;
