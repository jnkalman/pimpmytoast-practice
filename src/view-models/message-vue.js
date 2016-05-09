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
      // set up firebase connection
      firebase: {
        messages: new Firebase('https://radiant-torch-6650.firebaseio.com/messages').limitToLast(25),
        onlineUsers: new Firebase('https://radiant-torch-6650.firebaseio.com/onlineUsers')
      },
      // anything within the ready function will run when
      // the application loads, call methods to initialize the app
      // with data
      ready: function() {
        // when the application loads, call the initialize data method
        this.subscribe();
        toggle_functions.scrollToNewMessage();
      },

      // initial object
      data: {
        message: { name: '', description: '', date: '' },
        user: { name: '' }
      },

      components: {
        'chat-component': chat
      },

      // custom methods registered here
      methods: {
        subscribe: function() {
          var messages = this.$firebaseRefs.messages;

          messages.limitToLast(1).on("value", function(snapshot) {
            //CHECK HERE, MONDAY JAKE
            var latestMessage = data_functions.getData(snapshot.val(), {name: '', description: '', date: ''});
            console.log(latestMessage);
            // if not current window, show notification
            if (!document.hasFocus()) {
              alert_functions.showNotification(latestMessage);
            }
            alert_functions.playNotificationSound(0.35);
            toggle_functions.scrollToNewMessage();
          });

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
            //broadcast added message
            this.$broadcast('messageAdded', this.message.name);
            // this.userExists(this.message.name);
            this.addUser(this.message.name);
            // if (!userExists(this.message.name)) {
            //   users.
            // }
          }
        },

        addUser: function(username) {
          var user = this.$firebaseRefs.onlineUsers.child(username);
          var userData = {name: '', online: 'true'};
          userData.name = username;
          user.set(userData);
        }

        // userExists: function(username) {
        //   var users = this.$firebaseRefs.onlineUsers;
        //   var user = {name : ''};
        //
        //   users.once("value", function(snapshot) {
        //
        //
        //     console.log(data_functions.getData(snapshot.val(), {name: ''}));
        //
        //   });
        //
        //
        // }
      }
    });
  }

}


  var chat = {
    template: "#chatWindow",
    replace: true,
    methods: {},
    props: ['messages']
  };
