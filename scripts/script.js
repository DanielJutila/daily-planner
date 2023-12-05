$(document).ready(function () {
  var now = dayjs();

  var currentHour = dayjs().hour();
  for (var hour = 9; hour <= 17; hour++) {
    //made to show proper AM and PM
    var displayHour = (hour % 12 === 0) ? 12 : hour % 12;
    var ampm = (hour < 12) ? 'AM' : 'PM';

    //makes the time blocks
    var timeBlock = $('<div>').attr('id', 'hour-' + hour).addClass('row time-block');
    var numberBlock = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour + ampm);
    var noteInputArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');
    
    //puts correct color for backgrounds.
    if (hour < currentHour) {
      timeBlock.addClass('past');
    } else if (currentHour === hour) {
      timeBlock.addClass('present');
    } else {
      timeBlock.addClass('future');
    }
    timeBlock.append(numberBlock, noteInputArea, saveButton);
    $('.container-lg').append(timeBlock);
    $('#currentDay').text('Current day ' + now.format('MMMM D, YYYY'));
    //puts description into each block
    var putDescription = JSON.parse(localStorage.getItem(timeBlock.attr('id')));
    if (putDescription !== null) {
      noteInputArea.text(putDescription);
    }
  }
  //save button function
  $('.saveBtn').children().on('click', function (event) {
    event.preventDefault();
    //gets the text that was written next to the save button.
    var input = $(this).parent().parent().find('.description').val();
    var whichBlock = $(this).parent().parent().attr('id');
    localStorage.setItem(whichBlock, JSON.stringify(input));
  })
});