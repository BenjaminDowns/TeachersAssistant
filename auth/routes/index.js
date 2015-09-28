var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Teacher = mongoose.model('Teacher', new Schema( {
	id: ObjectId,
	firstName: String,
	lastName: String,
	email: {type: String, unique: true},
	password: String,
}))

mongoose.connect('mongodb://localhost/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Authentification' });
});

router.get('/login', function(req, res, next) {
	res.render('login.jade')
})

router.post('/login', function(req, res, next) {
	Teacher.findOne({ email: req.body.email }, function(err, teacher) {
		if (!teacher) {
			res.render('login.jade', {error: 'Invalid email or password.'});
		} else {
			if (req.body.password === teacher.password) {
				res.redirect('/dashboard');
			} else {
				res.render('login.jade', {error: 'Invalid email or password.'});
			}
		}
	})
});

router.get('/register', function(req, res, next) {
	res.render('register.jade')
});

router.post('/register', function(req, res, next) {
	var teacher = new Teacher({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	})
	teacher.save(function(err) {
		if (err) {
			var err = 'Something bad happened! Please try again!';
			if (err.code === 11000) {
				err = "That email is already taken. Please register with another."
			}
			res.render('register.jade', { error: err })
		} else {
			res.redirect('/dashboard');
		}
	})
})

router.get('/dashboard', function(req, res, next) {
	res.render('dashboard.jade')
});

router.get('/logout', function(req, res, next) {
	res.redirect('/')
})


module.exports = router;
