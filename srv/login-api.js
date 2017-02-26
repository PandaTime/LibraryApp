var log = require('./log');

function loginApi(app) {
    app.post('/api/login', login);
    app.all('/api/logout', logout);

    app.all('/api/readers*|/api/books*', function (req, res, next) {
        log.info('Check authorization', req.url, req.cookies);
        if(req.cookies['X-AUTH-TOKEN'] === '54321') next();
        else {
            res.status(401).end('Unauthorized access!');
            log.info('Unauthorized access!');
        }
    });

    function login(req, res) {
        log.info('Request:', req.method, req.url);
        log.info(req.body.user, req.body.password);
        if(req.body.user === 'vasya' && req.body.password === '12345') {
            res.status(200).cookie('X-AUTH-TOKEN', '54321').end('You are logged in!');
        }
        else {
            res.status(401).end('Invalid login or password!');
        }
    }

    function logout(req, res) {
        log.info('Request:', req.method, req.url);
        res.status(200).clearCookie('X-AUTH-TOKEN').end('You are logged out!');
    }
}

module.exports = loginApi;