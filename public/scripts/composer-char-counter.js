$(document).ready(function () {
  $('textarea').on('keyup', function () {
    var chars = "";
    var txtarea_len = $(this).val().length;

    var chars_left = 140 - txtarea_len;
    console.log(chars_left);

    var running_counter = $(this).siblings('.counter');


    console.log(running_counter);
    running_counter.text(chars_left);

    if (chars_left < 0) {
      running_counter.addClass('counterred');
    } else {
      running_counter.removeClass('counterred');
    }

  });
});
