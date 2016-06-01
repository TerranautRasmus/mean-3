/**
 * Created by kasper on 3/8/16.
 */

var expect = require("chai").expect;
var jokes = require("../model/jokes");
var connection = require("../db/db");
var testJokes = [
    {
        "joke": " Reality is an illusion created by a lack of alcohol",
        "type": ["short", "alcohol", "quote"],
        "reference": {"author": "Someone", "link": ""},
        "lastEdited": new Date()
    },
    {
        "joke": "I used to think the brain was the most important organ. Then I thought, look whatâ€™s telling me that",
        "type": ["short", "joke"],
        "reference": {"author": "Unknown", "link": ""},
        "lastEdited": new Date()
    }];

describe("The jokes factory", function () {
    before(function (done) {
        connection.connect("mongodb://localhost:27017/test", function () {
            done();
        });
    });
    beforeEach(function (done) {
        db.collection("jokes").deleteMany({}, function (err, data) {
            if (err) {
                throw new Error(err);
            }
            db.collection("jokes").insertMany(testJokes, function (err, data) {
                if (err) {
                    throw new Error(err);
                }
                done();
            });
        });
    });

    it("Should find 2 jokes", function (done) {
        jokes.allJokes(function (err, data) {
            expect(data.length).to.be.equal(5);
            done();
        })
    })
});
