var $ = require('jquery');
var Vue = require('vue');
var Firebase = require('firebase');
var moment = require('moment');
var messagesVue = require('./message-vue');
require('jquery-ui');

// explicit installation required in module environments
Vue.use(require('vuefire'));
Vue.use(require('vue-resource'));

module.exports = {
  /* Messages VUE */

  instantiateOnlineUsersVue : function() {
    new Vue({
      parent: messagesVue,
      // target online users div
      el: '#onlineUsers',
      // set up firebase connection
      firebase: {
        onlineUsers: new Firebase('https://radiant-torch-6650.firebaseio.com/onlineUsers')
      },
      // anything within the ready function will run when
      // the application loads, call methods to initialize the app
      // with data
      ready: function() {
        // when the application loads, call the initialize data method
        this.subscribe();
      },

      // initial object
      data: {
        onlineUser: { name: '' }
      },
      events: {
        // messageAdded: function(name) {
        //   console.log(name.val());
        //   console.log("hey i got a message");
        // }, function (errorObject) {
        //   console.log("The read failed: " + errorObject.code);
        // });
        // }
      },
      // custom methods registered here
      methods: {
        // subscribe: function() {
        //   var onlineUsers = this.$firebaseRefs.onlineUsers;
        //
        //   onlineUsers.on("messageAdded", function(name) {
        //     console.log(name.val());
        //     console.log("hey i got a message");
        //   }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        //   });
        // },

        // adds an message to the existing messages array
        addUser: function() {
          // if (this.message.name) {
          //   this.message.date = moment().format('YYYY-MM-DD HH:mm:ss');
          //   var messages = this.$firebaseRefs.messages;
          //   // add message
          //   messages.push(this.message);
          //   // reset message
          //   this.message = {name: this.message.name, description: '', date: ''};
          //   $("#name").hide();
          //   $("#signInStatus").html($("#signInStatus").html().replace("Not signed in.", "Signed in as " + this.message.name));
          //   $("#signInStatusIcon").switchClass("offline", "online");
          // }
        }

      }
    });
  }
}
