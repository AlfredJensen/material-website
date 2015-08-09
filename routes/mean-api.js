// Module for API Routes (serving JSON)
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Model = require('../models/model');

// Example API route
router.get('/models', function(req, res) {

  // Checks the model collection and returns all of them`
  Model.find(function(err, models) {

    // returns all people in JSON format
    res.send(models);
  });
});

// Example POST route
router.post('/models', function (req, res) {
  Model.create({
    name : req.body.name // Bound using Angular
  }, function(err, model) {
    if(err) {
      res.send(err);
    }

    Model.find(function(err, models) {
      res.send(models);
    });
  });
});

// Example DELETE route
router.delete('/models/:model_id', function (req, res) {
  Model.remove({
    _id: req.params.model_id
  }, function(err, model) {
    if(err) {
      res.send(err);
    }

    Model.find(function(err, models) {
      res.send(models);
    });
  });
});

module.exports = router;