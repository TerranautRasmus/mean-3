/**
 * Created by rasmus on 3/3/16.
 */
var express = require('express');
var api = express.Router();
var jokes = require('../model/jokes');

api.get("/api/findJoke", function (req, res, next) {
    res.render("findJoke.jade")
});

api.get('/api/allJokes', function (req, res, next) {
    jokes.allJokes(function (err, data) {
        if (err) {
            console.log("Error in allJokes");
            res.redirect("/");
        } else {
            return res.render("allJokes.jade", {jokes: data, title: "allJokes"})
        }
    })
});

api.get("/api/editJoke", function (req, res, next) {
    console.log("req.body: " + req.body._id)
    var jokeToEdit = {
        _id: req.body.editJokeID,
        joke: req.body.joke,
        type: req.body.type,
        reference: {
            author: req.body.author,
            link: req.body.link
        }
    };
    console.log("editTo id: " + req.body.editJokeID)
    console.log("id for toEdit joke: " + jokeToEdit._id)
    res.render("editJoke.jade", {editedJoke: jokeToEdit})
});

api.get('/api/randomJoke', function (req, res, next) {
    jokes.randomJoke(function (err, data) {
        if (err) {
            console.log("Error in random")
            res.redirect("/");
        } else {
            return res.render("randomJoke.jade", {jokes: data})
        }
    })
});
api.post('/api/addJoke', function (req, res, next) {
    var joke = req.body.joke;
    jokes.addJoke(joke, function (err, data) {
        if (err) {
            console.log("Error in addJoke");
            res.redirect('/');
        } else {
            res.render('index.jade', {notification: "Your joke has been submitted successfully"})
        }
    });
});

api.post("/api/findJoke", function (req, res, next) {
    var searchType = req.body.searchType;
    var searchInput = req.body.searchInput;
    console.log("input: " + searchType)
    var criteria = {
        searchType: searchType,
        searchInput: searchInput
    }

    jokes.findJoke(criteria, function (err, data) {
        if (err) {
            console.log("Error in findJoke")
            res.redirect("/")
        } else {
            res.render("findJoke.jade", {jokes: data, title: "found Joke"})
        }
    })
})

api.post('/editJoke/', function (req, res, next) {
    console.log("req.body: " + req.body.editedJoke)
    var jokeToEdit = {
        _id: req.body.editJokeID,
        joke: req.body.joke,
        type: req.body.type,
        reference: {
            author: req.body.author,
            link: req.body.link
        }
    };
    console.log("editTo id: " + req.body.editJokeID)
    console.log("id for toEdit joke: " + jokeToEdit._id)
    jokes.editJoke(jokeToEdit, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render('show-joke', {
                joke: jokeToEdit,
                result: result,
                jokeTypes: jokes.jokeTypes
            });
        }
    });
})

api.post("/api/deleteJoke", function (req, res, next) {
    var jokeID = req.body.deleteJokeID;
    jokes.deleteJoke(jokeID, function (err, data) {
        if (err) {
            console.log("Error in delete")
            res.redirect("/")
        } else {
            console.log("joke id from delete: " + jokeID)
            res.render("index.jade", {notification: "Your joke " + jokeID + " has been deleted"})
        }
    })
})

module.exports = api;