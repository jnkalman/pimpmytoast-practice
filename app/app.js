var $ = require('jquery');
var toggle = require('./toggle-functions');
var messageVue = require('./message-vue');



$(document).ready(function() {
  messageVue.instantiateMessageVue();

  $("#messageForm").submit(function(e) {
    e.preventDefault();
  });

  toggle.addButtonEnabledSwitch();
});
