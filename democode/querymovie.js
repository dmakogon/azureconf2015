// Simple document query - look for a given movie
//
// Usage: node querymovie movietitle

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('./config')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , host = config.connection.endpoint
  , masterKey = config.connection.authKey


if (process.argv.length <= 2) {
    console.log("Usage: querymovie <movietitle>");
    process.exit(-1);
}

var movieTitle = process.argv[2];

var client = new DocumentDBClient(host, {masterKey: masterKey});

var collLink = 'dbs/' + databaseId+ '/colls/'+ collectionId;

var query = 'SELECT * from Movies m WHERE m.title = \'' + movieTitle + '\'';

client.queryDocuments(collLink, query).toArray(function (err, results) {
            if (err) {
                console.log(err);

            } else {
                console.log(results);
            }
});