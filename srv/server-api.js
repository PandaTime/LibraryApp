var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var booksApi = require('./books-api');
var readersApi = require('./readers-api');
var loginApi = require('./login-api');

function serverApi(app) {
    // see details here http://expressjs.com/en/4x/api.html#app.get
    app.use(bodyParser.json());
    app.use(cookieParser());

    loginApi(app);
    booksApi(app);
    readersApi(app);
}

module.exports = serverApi;
