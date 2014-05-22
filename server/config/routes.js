var auth = require('../utilities/auth'),
    users = require('../controllers/users'),
    instances = require('../controllers/instances');

module.exports = function(app, config){
  app.post('/login', auth.authenticate);
  app.post('/logout', auth.logout);

  app.get('/api/users', auth.requireAdmin, users.getUsers);
  app.post('/api/users', auth.requireAdmin, users.createUser);

  app.get('/api/instances', auth.requireApiLogin, instances.getInstances);
  app.post('/api/instances', auth.requireAdmin, instances.addInstance);
  app.post('/api/instances/:id/start', auth.requireApiLogin, instances.startInstance);
  app.post('/api/instances/:id/stop', auth.requireApiLogin, instances.stopInstance);

  app.get('/partials/*', function(req, res){
    res.render(config.rootPath + '/public/app/' + req.params[0]);
  });

  app.get('*', function(req, res){
    res.render('index', {bootstrappedUser: req.user});
  });
};
