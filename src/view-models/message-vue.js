var $ = require('jquery');
var Vue = require('vue');
var Firebase = require('firebase');
var moment = require('moment');
var notify = require('notifyjs');
var data_functions = require('../data-functions');
var toggle_functions = require('../toggle-functions');
var alert_functions = require('../alert-functions');
require('jquery-ui');

// explicit installation required in module environments
Vue.use(require('vuefire'));
Vue.use(require('vue-resource'));

module.exports = {
  /* Messages VUE */

  instantiateVue : function() {
    new Vue({
      // target messages div
      el: '#app',
      firebase: {
        messages: new Firebase('https://radiant-torch-6650.firebaseio.com/messages').limitToLast(25),
        onlineUsers: new Firebase('https://radiant-torch-6650.firebaseio.com/onlineUsers')
      },
      // anything within the ready function will run when
      // the application loads, call methods to initialize the app
      // with data
      ready: function() {
        // when the application loads, call the initialize data method
        // this.$children[0].subscribeToMessageUpdates();
//        this.$children[2].subscribeToUserUpdates();

        // this.subscribe();
        toggle_functions.scrollToNewMessage();
      },

      components: {
        'chat-component': chatComponent,
        'send-component': sendComponent,
        'users-component': usersComponent
      }
    });
  }

}


  var chatComponent = {
    template: "#chatWindow",
    replace: true,
    firebase: {
      messages: new Firebase('https://radiant-torch-6650.firebaseio.com/messages').limitToLast(25),
    },
    ready: function() {
      var messages = this.$firebaseRefs.messages;

      messages.limitToLast(1).on("value", function(snapshot) {
        var latestMessage = data_functions.getData(snapshot.val(), {name: '', description: '', date: ''});
        // if not current window, show notification
        if (!document.hasFocus()) {
          alert_functions.showNotification(latestMessage);
        }
        alert_functions.playNotificationSound(0.35);
        toggle_functions.scrollToNewMessage();
      });
    },
    methods: {
      // subscribeToMessageUpdates: function() {
      //   var messages = this.$firebaseRefs.messages;
      //
      //   messages.limitToLast(1).on("value", function(snapshot) {
      //     var latestMessage = data_functions.getData(snapshot.val(), {name: '', description: '', date: ''});
      //     // if not current window, show notification
      //     if (!document.hasFocus()) {
      //       alert_functions.showNotification(latestMessage);
      //     }
      //     alert_functions.playNotificationSound(0.35);
      //     toggle_functions.scrollToNewMessage();
      //   });
      // }
    },
    props: ['messages']
  };

  var sendComponent = {
    template: "#sendMessageWindow",
    replace: true,
    firebase: {
      messages: new Firebase('https://radiant-torch-6650.firebaseio.com/messages').limitToLast(25),
      onlineUsers: new Firebase('https://radiant-torch-6650.firebaseio.com/onlineUsers')
    },
    data: function() {return {message: { name: '', description: '', date: '' }};},
    methods: {
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

          $("#signInStatusPanel").delay(1000).hide(1000);
          //broadcast added message
          this.$broadcast('messageAdded', this.message.name);
          this.addUser(this.message.name);
            toggle_functions.scrollToNewMessage();
        }
      },

      addUser: function(username) {
        var user = this.$firebaseRefs.onlineUsers.child(username);
        var userData = {name: '', online: 'true'};
        userData.name = username;
        user.set(userData);
        // hacky way to remove users
        $( window ).unload(function() {
          user.remove();
        });
      }



    },
    props: ['messages', 'onlineUsers']
  };

  var usersComponent = {
    template: "#onlineUsersWindow",
    firebase: {
      onlineUsers: new Firebase('https://radiant-torch-6650.firebaseio.com/onlineUsers')
    },
    replace: true,
    methods: {
      // subscribeToUserUpdates: function() {
      //   var onlineUsers = this.$firebaseRefs.onlineUsers;
      //
      //   onlineUsers.orderByChild('online').equalTo('true').on("value", function(snapshot) {
      //
      //     var users = data_functions.getData(snapshot.val(), {name: ''});
      //     console.log(users);
      //   });
      // }
    },
    props: ['onlineUsers']
  };
