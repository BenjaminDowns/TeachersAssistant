var chance = require('chance').Chance();

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/teachersassistant", function(err, db) {
  if(err) {
    console.log("Something went wrong!");
    console.log(err);
  } else {
	console.log("Successfully connected to db: ")
	// console.log(db)
  	var studentCollection = db.collection('students')
  	var studentBulk = studentCollection.initializeUnorderedBulkOp();

	function Student() {
		var lessonsTaken = []
		var randomBirthYear = chance.integer({min: 1965, max: 2013})
		var startDate = randomBirthYear + chance.integer({min: 2, max: 10})
		if (startDate > 2014) {
			startDate = 2014
		}
		
		var loop = (2015 - startDate) * 30
		for (var i = 0; i < loop; i++) {
			var randomYear = chance.integer({min: startDate, max: 2015})
			lessonsTaken.push(chance.date({ year: randomYear}))
		}
		lessonsTaken.sort(function(a,b) {return a - b})
		this.first_name = chance.first()
		this.last_name = chance.last()
		this.email = chance.email()
		this.phone = chance.phone()
    	this.address = chance.address()
		this.birthdate = chance.date({ year: randomBirthYear })
		this.female = chance.bool()
		this.Suzuki = chance.bool()
		this.start_book = chance.integer({min: 1, max: 10})
		var currentBook = this.start_book + chance.integer({min: 0, max: 10})
		if (currentBook > 12) {
			currentBook = 12
		}
		this.rate = 60
		this.current_book = currentBook
		this.start_date = chance.date({ year: startDate })
		this.lessons_taken = lessonsTaken
		this.instrument = 'cello'
		this.group = 'A'
		this.teacher = '560d805d1a22275605556751'
	};

		for (var i = 0; i < 100; i++) {
			var nextStudent = new Student()
			studentBulk.insert(nextStudent)
		};
		studentBulk.execute(function(err, result) {
			if (err) console.log(err)
			else console.log(result)
			db.close()
		})


	}
});

// ---------------------------------------
// After insert, then run this in the shell: db.students.update({}, {$set: {'teacher': ObjectId("your-ObjectID")}}, {multi: true})
// ---------------------------------------




// 	var invoices = db.collection('invoices')
// 	var studentCollection = db.collection('students')
// 	var invoicesBulk = invoices.initializeUnorderedBulkOp();

// var students = ['Duane Andrews',
//   'Katie Palmer', 
//   'Louisa Dean' ,
//   'Nancy Elliott', 
//   'Laura Bowers' ,
//   'Nicholas Brooks', 
//   'Isabel Burns' ,
//   'Mina Howell' ,
//   'Frances Wallace' ,
//   'Minerva Ryan' ,
//   'Mina Smith' ,
//   'Mary Reyes' ,
//   'Luella Clarke', 
//   'Catherine Robertson', 
//   'Della Payne' ,
//   'Jose Harper' ,
//   'Jacob Stokes' ,
//   'Nathaniel Rios', 
//   'Steve Cannon' ,
//   'Nora Phillips' ,
//   'Lela Sanchez' ,
//   'Esther Greene' ,
//   'Margaret Hardy' ,
//   'Scott Cruz' ,
//   'Ada Swanson' ,
//   'Aiden Rodriquez', 
//   'Sarah Taylor' ,
//   'Francis Ramos' ,
//   'Rosalie Elliott', 
//   'Millie Bishop']


// 	function Invoice(x) {
// 		this.invoice_number = x
// 		this.student = students[(chance.integer({min:0, max: 29}))]
// 		this.payed = chance.bool()
// 		this.lesson_date = chance.date()
// 	};


// 	for (var i = 0; i < 5000; i++) {
// 		var nextInvoice = new Invoice(i)
// 		invoicesBulk.insert(nextInvoice)
// 	};

// 	invoicesBulk.execute(function(err, result) {
// 		if (err) console.log(err)
// 		console.log(result)
// 	})

//   }

// });





