var $ = require('jquery');
var toggle = require('./src/toggle-functions');
var messageVue = require('./src/view-models/message-vue');


$(document).ready(function() {
  messageVue.instantiateVue();
  $("#messageForm").submit(function(e) {
    e.preventDefault();
  });

  toggle.addButtonEnabledSwitch();
  toggle.scrollToNewMessage();
  $("#name").focus();
});

// var rootInstance = new Vue({
// 	el: '#app',
//   data: {
//     message: { name: '', description: '', date: '' }
//     user: { name: '' }
//   },
//   firebase: {
//     messages: new Firebase('https://radiant-torch-6650.firebaseio.com/messages').limitToLast(25),
//     onlineUsers: new Firebase('https://radiant-torch-6650.firebaseio.com/onlineUsers')
//   },
//   components:{'chat-component':chat},
// });
