var express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

module.exports = function(app, config){
  function compile(str, path){
    return stylus(str).set('filename', path);
  }

  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({
    secret: 'cloud instance mgr unicorns',
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(
      {db:'cim'},
      function(info){
          console.log('connect-mongodb setup ok');
      }) 
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(stylus.middleware({
    src: config.rootPath + '/public',
    compile: compile
  }));
  app.use(express.static(config.rootPath + '/public'));
};