var api = {},
    _ = require('lodash');

module.exports = api;

var library = [
    {
        "id": "978-0641723445",
        "cat": ["book", "hardcover"],
        "name": "The Lightning Thief",
        "author": "Rick Riordan",
        "series_t": "Percy Jackson and the Olympians",
        "sequence_i": 1,
        "genre_s": "fantasy",
        "inStock": true,
        "price": 12.50,
        "pages_i": 384
    }
    ,
    {
        "id": "978-1423103349",
        "cat": ["book", "paperback"],
        "name": "The Sea of Monsters",
        "author": "Rick Riordan",
        "series_t": "Percy Jackson and the Olympians",
        "sequence_i": 2,
        "genre_s": "fantasy",
        "inStock": true,
        "price": 6.49,
        "pages_i": 304
    }
    ,
    {
        "id": "978-1857995879",
        "cat": ["book", "paperback"],
        "name": "Sophie's World : The Greek Philosophers",
        "author": "Jostein Gaarder",
        "sequence_i": 1,
        "genre_s": "fantasy",
        "inStock": true,
        "price": 3.07,
        "pages_i": 64
    }
    ,
    {
        "id": "978-1933988177",
        "cat": ["book", "paperback"],
        "name": "Lucene in Action, Second Edition",
        "author": "Michael McCandless",
        "sequence_i": 1,
        "genre_s": "IT",
        "inStock": true,
        "price": 30.50,
        "pages_i": 475
    }
]
api.initialize = function(app, publicPath){
    // see details here http://expressjs.com/en/4x/api.html#app.get
    app.get('/api/books', books);
    app.get('*', (req, res)=>{
        res.sendFile(publicPath + '\\index.html')
    })
};

function books(req, res) {
    console.info('Request:', req.method, req.url);
    // see details here http://expressjs.com/en/4x/api.html#res.json
    res.json(_.map(library, function(book){ return { id: book.id, name: book.name, author: book.author }; }));
}