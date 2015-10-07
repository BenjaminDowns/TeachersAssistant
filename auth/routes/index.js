var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var dashboard = require('./dashboard.js')

var Teacher = mongoose.model('Teacher', new Schema( {
	id: ObjectId,
	firstName: String,
	lastName: String,
	email: {type: String, unique: true},
	password: String,
}))

var Student = mongoose.model('Student', new Schema( {
	id: ObjectId,
	first_name: String,
	last_name: String,
	email: String,
	phone: String,
	birthdate: Date,
	Suzuki: Boolean,
	birthdate: Date,
	end_date: Date,
	start_book: Number,
	lessons_taken: [],
	instrument: String,
	rate: Number,
	group: String,
	lesson_time: Date,
	address: String,
	teacher: ObjectId
}))

// db.students.insert({firstName: 'Yoyo', lastName: 'Ma', email: 'yoyoma@gmail.com', birthdate: Date(), Suzuki: false, start_date: Date(), end_date: Date(), start_book: 1, lessons_taken: [Date()], instrument: 'cello', rate: 60, group: 'C', lesson_time: Date(), address: '1 Cello Street, Cello City, Cellopolis, CA, 54321', teacher

mongoose.connect('mongodb://localhost/teachersassistant');

router.use(function(req, res, next) {
  if (req.session && req.session.teacher) {
    Teacher.findOne({email: req.session.teacher.email }, function(err, teacher) {
      if (teacher) {
        req.teacher = teacher;
        delete req.teacher.password;
        req.session.teacher = req.teacher;
        res.locals.teacher = req.teacher;
      }
      next();
    })
  } else {
  	next();
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Music Teacher\'s Helper or something' });
});

router.get('/login', function(req, res, next) {
	console.log("rendering login page")
	req.session.destroy()
	// not sure this is best – could there be a case where a teacher wants to access the login page without wanting to be logged out?
	res.render('login.jade', { csrfToken: req.csrfToken() })
})

router.post('/login', function(req, res, next) {
	Teacher.findOne({ email: req.body.email }, function(error, teacher) {
		if (!teacher) {
			res.render('login.jade', {error: 'Invalid email or password.', csrfToken: req.csrfToken() });
		} else {
			if (bcrypt.compareSync(req.body.password, teacher.password)) {
				req.session.teacher = teacher; // set-cookie: session
				res.redirect('/dashboard');
			} else {
				res.render('login.jade', {error: 'Invalid email or password.', csrfToken: req.csrfToken() });
			}
		}
	})
});

router.get('/register', function(req, res, next) {
	res.render('register.jade', { csrfToken: req.csrfToken() })
});

router.post('/register', function(req, res, next) {
	var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	var teacher = new Teacher({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hash
	})
	teacher.save(function(err) {
		if (err) {
			var err = 'Something bad happened! Please try again!';
			if (err.code === 11000) {
				err = "That email is already taken. Please register with another."
			}
			res.render('register.jade', { error: err, csrfToken: req.csrfToken() })
		} else {
			res.redirect('/dashboard');
		}
	})
})

router.get('/dashboard', requireLogin, function(req, res, next) {
	Student.find({teacher: req.teacher._id}, function(err, students) {
		if (err) {
			console.log(err)
			res.render('dashboard.jade', {csrfToken: req.csrfToken(), error: err })
		} else {
			// Make the lessons taken look pretty
			students.forEach(function(student) {
				return student.lessons_taken = student.lessons_taken.map(function(x) { return x.toLocaleDateString() })
			});
			res.render('dashboard.jade', { csrfToken: req.csrfToken(), students: students })
		}
	}).sort({'last_name': 1})
});


router.get('/managestudents', requireLogin, function(req, res, next) {
	Student.find(function(err, students) {
		if (err) {
			console.log(err)
			res.render('managestudents.jade', {csrfToken: req.csrfToken(), error: err })
		} else {
			res.render('managestudents.jade', { csrfToken: req.csrfToken(), students: students })		
		}
	})
})

router.post('/managestudents', requireLogin, function(req, res, next) {
	var student = new Student({
		name: req.body.name,
		email: req.body.email,
		birthdate: req.body.birthdate,
		Suzuki: req.body.Suzuki,
		start_date: req.body.start_date,
		end_date: req.body.end_date,
		start_book: req.body.start_book,
		lessons_taken: [Date()],
		instrument: req.body.instrument,
		rate: req.body.rate,
		group: req.body.group,
		lesson_time: req.body.lesson_time,
		address: req.body.address,
		teacher: req.teacher
	})
	student.save(function(err) {
		if (err) {
			console.log(err)
			var err = 'Something bad happened! Please try again!';
			if (err.code === 11000) {
				err = "That email is already taken. Please register with another."
			}
			res.render('managestudents.jade', { error: err , csrfToken: req.csrfToken() })
		} else {
			res.render('managestudents.jade', {message: "Your new student was successfully saved", csrfToken: req.csrfToken()});
		}
	})
})

router.get('/layout2', requireLogin, function(req, res, next) {
	Student.find({teacher: req.teacher._id}, function(err, students) {
		if (err) {
			console.log(err)
			res.render('layout2.jade', {csrfToken: req.csrfToken(), error: err })
		} else {
			res.render('layout2.jade', { csrfToken: req.csrfToken(), students: students })		
		}
	})
})

function requireLogin(req, res, next) {
  if (!req.teacher) {
    res.redirect('/login')
  } else {
    next()  
  }
};

module.exports = router;