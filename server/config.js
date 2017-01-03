var path = require('path');

module.exports = {
    publicPath : path.normalize(__dirname + '/../public'),
    port: process.env.PORT || 8080
}