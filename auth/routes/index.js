var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Authentification' });
});

router.get('/login', function(req, res, next) {
	res.render('login.jade')
});

router.get('/register', function(req, res, next) {
	res.render('register.jade')
});

router.get('/dashboard', function(req, res, next) {
	res.render('dashboard.jade')
});

router.get('/logout', function(req, res, next) {
	res.redirect('/')
})


module.exports = router;
