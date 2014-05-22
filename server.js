var express = require('express'),
    auth = require('./server/utilities/auth');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var config = {rootPath: __dirname, port: 3030};

var app = express();

require('./server/config/mongoose')();
require('./server/config/express')(app, config);
require('./server/config/passport')();
require('./server/config/aws')(config);

require('./server/config/routes')(app, config);

app.listen(config.port);
console.log("listening on port " + config.port + "...");