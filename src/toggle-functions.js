var $ = require('jquery');

module.exports = {

  addButtonEnabledSwitch: function() {
    $('#submitButton').attr('disabled', true);

    $('#messageText').on('keyup',function() {
      var messageText_value = $('#messageText').val();
      if(messageText_value != '') {
        $('#submitButton').attr('disabled' , false);
      } else {
        $('#submitButton').attr('disabled' , true);
      }
    });
  },

  scrollToNewMessage: function() {
    var target = $('#messageWindow');
    if( target.length ) {
      event.preventDefault();
      target.animate({
        scrollBottom: target.offset().top
      }, 200);
    }
  }
}
