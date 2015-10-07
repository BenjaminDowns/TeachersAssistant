$(document).ready(function() {
  // -------------------
  // Dashboard controls
  // -------------------

  // Dashboard default appearance //
  if (document.getElementById('dashDate')) {
    var dashboardTime = document.getElementById('dashDate')
    dashboardTime.innerHTML += '<strong>' + new Date().toDateString() + '</strong>'
    $('.studentDashInfo').hide();
    $('ol.lessonsTaken').hide();
  }
  
  // Dashboard functionality

  $('li.studentName').click(function() {
    $(this).siblings('ul').toggle('fast');
  })

  $('#hideAll').click(function() {
    $('.studentDashInfo').hide('fast')
    $('ol').hide('fast')
  })

  $('li.lessons').click(function() {
    $(this).siblings('ol').toggle('fast');
  })

  $('div#toggleButton').click(function() {
    $('div#wrapper').toggleClass('toggled')
    $('div#sidebar-wrapper').toggleClass('toggled')
    $('#toggleButton').toggleClass('toggled')
  })



  // function calcAge(student) {
  //   now = new Date();
  //   var birthDate = new Date(student.dob);
  //   var years = (now.getFullYear() - birthDate.getFullYear());

  //   if (now.getMonth() < birthDate.getMonth() ||
  //   now.getMonth() == birthDate.getMonth() && now.getDate() < birthDate.getDate()) {
  //         years--;
  //     }
  //     return years;
  // }

  // for (var student in students) {
  //   // check for birthdays
  //   var month = new Date().getMonth() + 1
  //   var day = new Date().getDate()
  //   var birthDate = students[student].birth_date.getDate()
  //   var birthMonth = students[student].birth_date.getMonth()
  //   // get startdate
  //   var startDate = students[student].start_date.toDateString()

  //   // generate student list
  //   studentList.innerHTML += 
  //   "<li class='student well'>Student: " + students[student].name 
  //   + "<p> Age: " + calcAge(students[student]) + 
  //   "<p>Started on: " + startDate

  //   // add notification of birthday
  //   if (month == birthMonth && day == birthDate) {
  //     studentList.innerHTML += "<strong>It is " + students[student].name + "'s birthday today!</strong>"
  //   } 
  //   studentList.innerHTML += "</li><hr></hr>" 
  // }

  // var invoiceList = document.getElementById('invoiceList')

  // for (var invoice in invoicesDB) {  
  // if (invoicesDB[invoice].total_amount > 0) {
  //   invoiceList.innerHTML += 
  //     "<li class='invoice well'>Student: " + invoicesDB[invoice].student 
  //     + "<p> Owes: " + invoicesDB[invoice].total_amount 
  //     "<p>from the following lessons: "
  //     for (var lesson in invoicesDB[invoice]['lessons']) {
  //       invoiceList.innerHTML += "<li class='invoice'>" + (parseInt(lesson) + 1) + ") " + invoicesDB[invoice].lessons[lesson].toDateString() + "</li>"
  //     } 
  //     invoiceList.innerHTML += "</li><hr></hr>" 
  // }
  // }
})