/**
 * Created by kasper on 3/8/16.
 */

var connect = require("../db/db");


function _allJokes(callback) {
    var db = connect.get();
    db.collection("jokes").find({}).toArray(function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
}


exports.allJokes = _allJokes();
exports.findJoke;
exports.editJoke;
exports.deleteJoke;
exports.randomJoke;

