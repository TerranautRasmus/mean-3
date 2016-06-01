/**
 * Created by rasmus on 3/1/16.
 */
var connection = require("../db/db");
var db;


function _allJokes(callback) {
    if (!db) {
        db = connection.get();
        if (!db)console.log("No db connection!");
    }
    db.collection('jokes').find().toArray(function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

function _findJoke(criteria, callback) {
    if (!db) {
        db = connection.get();
        if (!db)console.log("No db connection!");
    }
    //find by id
    if (criteria.searchType === "id") {
        db.collection('jokes').find({
            "_id": connection.ObjectID(criteria.searchInput)
        }).toArray(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
        //find by type
    } else if (criteria.searchType === "type") {
        db.collection('jokes').find({
            "type": {$in: [criteria.searchInput]}
        }).toArray(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
        //find by author name
    } else if (criteria.searchType === "author") {
        db.collection('jokes').find({
            "reference.author": criteria.searchInput
        }).toArray(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    }
}


function _addJoke(jokeToAdd, callback) {
    if (!db) {
        db = connection.get();
        if (!db)console.log("No db connection!");
    }
    db.collection('jokes').insertOne({
        "joke": jokeToAdd,
        "type": ["unique", "joke"],
        "reference": {
            "author": "Mio",
            "link": "www.lololol.com"
        },
        "lastEdited": new Date()
    }, function (err, result) {
        if (err) {
            console.log("Error when addJoke!");
        }
        else {
            console.log("Inserted a document into the jokes collection!");
            callback(null, result);
        }
    });
}

function _editJoke(jokeToEdit, callback) {

    if (!db) {
        db = connection.get();
        if (!db)console.log("No db connection!");
    }
    db.collection('jokes').updateOne(
        {
            "_id": new connection.ObjectID(jokeToEdit.editJokeID)
        },
        {
            $set: {"joke": jokeToEdit.editJokeID},
            $currentDate: {"lastModified": true}
        },
        function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        }
    );
}

function _deleteJoke(id, callback) {

    if (!db) {
        db = connection.get();
        if (!db)console.log("No db connection!");
    }
    console.log("this is the id: " + id)
    db.collection('jokes').deleteOne(
        {
            "_id": new connection.ObjectID(id)
        },
        function (err, results) {
            db.collection('jokes').find().toArray(function (err, data) {
                if (err) {
                    callback(err, null);
                } else {
                    data.notification = results;
                    callback(null, data);
                }
            });
        });
}

function _randomJoke(callback) {

    if (!db) {
        db = connection.get();
        if (!db)console.log("No db connection!");
    }
    db.collection('jokes').find().toArray(function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            console.log("data is: " + data)
            var randomIndex = Math.floor((Math.random() * data.length));
            callback(null, data[randomIndex]);
        }
    });
}

exports.allJokes = _allJokes;
exports.findJoke = _findJoke;
exports.addJoke = _addJoke;
exports.editJoke = _editJoke;
exports.deleteJoke = _deleteJoke;
exports.randomJoke = _randomJoke;
