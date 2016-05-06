var $ = require('jquery');
var toggle = require('./src/toggle-functions');
var messageVue = require('./src/view-models/message-vue');
var onlineUsersVue = require('./src/view-models/online-users-vue');


$(document).ready(function() {
  messageVue.instantiateMessageVue();
  //onlineUsersVue.instantiateOnlineUsersVue();
  $("#messageForm").submit(function(e) {
    e.preventDefault();
  });

  toggle.addButtonEnabledSwitch();

  $("#name").focus();
});
