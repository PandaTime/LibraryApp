/**
 * Created by pizzax on 04.01.2017.
 */
var express = require('express'),
    config = require('./server/config'),
    bodyParser = require('body-parser');


var app = express();

app.use(express.static(config.publicPath));
app.use(bodyParser.json());
require('./server/router').initialize(app, config.publicPath);
app.listen(config.port, ()=>{console.log(`Listening on port ${config.port}..`)});

// Taken from here
// https://github.com/tamingtext/book/blob/master/apache-solr/example/exampledocs/books.json


