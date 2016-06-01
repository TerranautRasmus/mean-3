/**
 * Created by rasmusr on 3/17/16.
 */

var redis = require('redis');

//change values to connect to different database
var PORT = 12531;
var ENDPOINT = "pub-redis-12531.us-east-1-3.1.ec2.garantiadata.com";
var PASSWORD = "Rasmus123";

//Create the client with the values specified above
var client = redis.createClient(PORT, ENDPOINT, {no_ready_check: true});
//Checks that you are authorised to acces the database, otherwise throw an error
client.auth(PASSWORD, function (err) {
    if (err){
        console.log(err);
    }
});
//sets a new key with the value "This is cool" and gets the value from key1 with
client.set("key1", "This is cool", redis.print);
client.get("key1", function (err, reply) {
    if (err) throw err;
    console.log(reply.toString());
});