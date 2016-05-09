var $ = require('jquery');
var toggle = require('./src/toggle-functions');
var messageVue = require('./src/view-models/message-vue');


$(document).ready(function() {
  messageVue.instantiateMessageVue();
  $("#messageForm").submit(function(e) {
    e.preventDefault();
  });

  toggle.addButtonEnabledSwitch();
  toggle.scrollToNewMessage();
  $("#name").focus();
});
