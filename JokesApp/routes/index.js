var express = require('express');
var jokes = require('../model/jokes');
var router = express.Router();

/* GET home page. */
router.get('/index', function (req, res, next) {
    res.render('index.jade', {
        title: 'Express',
        userName: req.session.userName
    });
});

//Get randomJoke page
router.get('/api/randomJoke', function (req, res, next) {
    if (req.session.randomJokePage) {
        req.session.randomJokePage++
    } else {
        req.session.randomJokePage = 1;
    }
    res.render('randomJoke.jade', {
        title: 'randomJoke',
        jokes: jokes,
        randomJokePage: req.session.randomJokePage
    });
});

//Get addJoke page
router.get('/api/addJoke', function (req, res, next) {
    if (req.session.addJokePage) {
        req.session.addJokePage++
    } else {
        req.session.addJokePage = 1;
    }
    res.render('addJoke.jade', {
        title: 'addJoke',
        jokes: jokes,
        addJokePage: req.session.addJokePage
    });
});

//get allJokes page
router.get('/api/allJokes', function (req, res, next) {
    if (req.session.allJokesPage) {
        req.session.allJokesPage++;
    } else {
        req.session.allJokesPage = 1;
    }
    res.render('allJokes.jade', {
        title: "allJokes",
        allJokesPage: req.session.allJokesPage,
        jokes: jokes
    });
});

//Post new joke to jokes-array
router.post('/api/addJoke', function (req, res) {
    console.log("router.post")
    var joke = req.body.joke;
    if (joke) {
        jokes.addJoke(joke)
    }
    res.redirect('/addJoke')
});

module.exports = router;