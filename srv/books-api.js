var log = require('./log');
var _ = require('lodash');
var sleep = require('system-sleep');
// Taken from here 
// https://github.com/tamingtext/book/blob/master/apache-solr/example/exampledocs/books.json
var books = require('./books.json');

function booksApi(app) {
    app.param('book_id', function (req, res, next, book_id) {
        req.book_id = book_id;
        next();
    });

    app.get('/api/books', getBooks);
    app.get('/api/books/:book_id', editBook);
    app.delete('/api/books/:book_id', deleteBook);
    app.put('/api/books/:book_id', saveBook);

    function getBooks(req, res) {
        log.info('Request:', req.method, req.url);
        // sleep(2000); // simulate network delay;        
        // see details here http://expressjs.com/en/4x/api.html#res.json
        res.json(_.map(books, function(book){ return { id: book.id, name: book.name, author: book.author }; }));
    }

    function editBook(req, res) {
        log.info('Request:', req.method, req.url);
        var book = _.find(books, { id: req.book_id });
        // sleep(2000); // simulate network delay;
        if(book) res.json(book);
        else res.status(404).end();
    }

    function deleteBook(req, res) {
        log.info('Request:', req.method, req.url);
        var removedBooks = _.remove(books, { id: req.book_id });
        if(removedBooks.length) res.end();
        else res.status(404).end();
    }

    function saveBook(req, res) {
        log.info('Request:', req.method, req.url, req.body);
        var i = _.findIndex(books, { id: req.book_id });
        if(i === -1) i = books.length;
        books[i] = req.body;
        res.end();
    }
}

module.exports = booksApi;