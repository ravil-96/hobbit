$('#password, #confirm_password').on('keyup', function () {
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('MATCHING').css('color', 'green');
    } else 
      $('#message').html('NOT MATCHING').css('color', 'red');
  });

