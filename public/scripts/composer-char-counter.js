$(document).ready(function () {
  $('textarea').on('keyup', function () {
    var chars = "";
    var txtarea_len = $(this).val().length;

    var chars_left = 140 - txtarea_len;
    console.log(chars_left);

    var running_counter = $(this).siblings('.counter');


    // console.log(running_counter);
    running_counter.text(chars_left);

    if (chars_left === 140) {
      running_counter.addClass('counterred');
      alert('You have entered too many characters');
    } else {
      running_counter.removeClass('counterred');
    }

  });
});
