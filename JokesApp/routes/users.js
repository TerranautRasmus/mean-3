var express = require('express');
var router = express.Router();

//get Login page
router.get('/', function (req, res, next) {
  res.render('login.jade' , {userName: req.userName});
});

module.exports = router;

