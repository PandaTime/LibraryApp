var log = require('./log');
var _ = require('lodash');
var sleep = require('system-sleep');
var readers = require('./readers.json');

function readersApi(app) {
    app.param('reader_id', function (req, res, next, reader_id) {
        req.reader_id = reader_id;
        next();
    });
    

    app.get('/api/readers', getReaders);
    app.get('/api/readers/:reader_id', editReader);
    app.delete('/api/readers/:reader_id', deleteReader);
    app.put('/api/readers/:reader_id', saveReader);

    
    function getReaders(req, res) {
        log.info('Request:', req.method, req.url);
        res.json(_.map(readers, function(reader){ return { id: reader.id, name: reader.name, isActive: reader.isActive }; }));
    }

    function editReader(req, res) {
        log.info('Request:', req.method, req.url);
        var reader = _.find(readers, { id: req.reader_id });
        if(reader) res.json(reader);
        else res.status(404).end();
    }

    function deleteReader(req, res) {
        log.info('Request:', req.method, req.url);
        var removedReaders = _.remove(readers, { id: req.reader_id });
        if(removedReaders.length) res.end();
        else res.status(404).end();
    }

    function saveReader(req, res) {
        log.info('Request:', req.method, req.url, req.body);
        var i = _.findIndex(readers, { id: req.reader_id });
        if(i === -1) i = readers.length;
        readers[i] = req.body;
        res.end();
    }

}

module.exports = readersApi;