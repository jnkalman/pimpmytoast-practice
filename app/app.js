var $ = require('jquery');
var Vue = require('vue');
var Firebase = require('firebase');
var moment = require('moment');
// explicit installation required in module environments
require('jquery-ui');
Vue.use(require('vuefire'));
Vue.use(require('vue-resource'));


/* EVENTS VUE */

new Vue({
  // target messages div
  el: '#messages',
  // set up firebase connection
  firebase: {
    messages: new Firebase('https://radiant-torch-6650.firebaseio.com/messages').limitToLast(4)
  },
  // anything within the ready function will run when
  // the application loads, call methods to initialize the app
  // with data
  ready: function() {
    // when the application loads, call the initialize data method
    //this.fetchMessages();
    // var messages = this.$firebaseRefs.messagesDataRef;
    this.subscribe();
    //this.$set('messages', messageData);
  },

  // initial object
  data: {
    message: { name: '', description: '', date: '' }
  },

  // custom methods registered here
  methods: {
    subscribe: function() {
      var messages = this.$firebaseRefs.messages;

      messages.on("value", function(snapshot) {
        console.log(snapshot.val());
        console.log("hey i got a message");
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },
    // method to retrieve and set data
    fetchMessages: function() {


    },

    // adds an message to the existing messages array
    addMessage: function() {
      if (this.message.name) {
        this.message.date = moment().format('YYYY-MM-DD HH:mm:ss');
        var messages = this.$firebaseRefs.messages;
        // add message
        messages.push(this.message);
        // reset message
        this.message = {name: this.message.name, description: '', date: ''};
        $("#name").hide();
        $("#signInStatus").html($("#signInStatus").html().replace("Not signed in.", "Signed in as " + this.message.name));
        $("#signInStatusIcon").switchClass("offline", "online");
      }
    }

    //
    // // deletes an message via the passed in index value
    // deleteMessage: function(message) {
    //   if (confirm("Are you sure you want to delete this message?")) {
    //     // this is going to change in 2.0, so I may need to rewrite this using
    //     // $index and splice
    //     this.messages.$remove(message);
    //   }
    // }

  }
});

$(document).ready(function() {

  $("#messageForm").submit(function(e) {
    e.preventDefault();
  });

  addButtonEnabledSwitch();
});

var addButtonEnabledSwitch = function() {
  $('#submitButton').attr('disabled', true);

  $('#messageText').on('keyup',function() {
    var messageText_value = $('#messageText').val();
    if(messageText_value != '') {
          $('#submitButton').attr('disabled' , false);
      } else {
          $('#submitButton').attr('disabled' , true);
      }
  });
};
