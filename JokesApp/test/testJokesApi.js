/**
 * Created by rasmus on 3/6/16.
 */
//npm install -save request
var request = require("request");

//Will test the api when run.

//The options for the request
var options = {
    url: "http://localhost:3000/api/addJoke",
    method: "POST",
    json: true,
    body: {joke: "I'm a joke"}
};

//The request with the parameters from options
request (options, function (error, res, body) {
    console.log(body.joke);
});

//Will print a random Joke out to the console
request("http://localhost:3000/api/randomJoke", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var randomjoke = JSON.parse(body);
        console.log("Test af get random joke: "+randomjoke.joke) 
    }
});

//Will print all the jokes out in a console
request("http://localhost:3000/api/allJokes", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var alljokes = JSON.parse(body);               
        console.log("Test af jokes: "+alljokes.jokes) 
    }
});
