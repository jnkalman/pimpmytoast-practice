var $ = require('jquery');
var Vue = require('vue');
var Firebase = require('firebase');
var moment = require('moment');
var notify = require('notifyjs');
var data_functions = require('../data-functions');
require('jquery-ui');

// explicit installation required in module environments
Vue.use(require('vuefire'));
Vue.use(require('vue-resource'));

module.exports = {
  /* Messages VUE */

  instantiateMessageVue : function() {
    new Vue({
      // target messages div
      el: '#messages',
      children: [],
      // set up firebase connection
      firebase: {
        messages: new Firebase('https://radiant-torch-6650.firebaseio.com/messages').limitToLast(25)
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
        message: { name: '', description: '', date: '' }
      },

      // custom methods registered here
      methods: {
        subscribe: function() {
          var messages = this.$firebaseRefs.messages;

          messages.limitToLast(1).on("value", function(snapshot) {

            var latestMessage = data_functions.getLatestMessageData(snapshot.val());
            console.log(latestMessage);
            var latestMessageJSON = JSON.stringify(latestMessage);
            console.log(latestMessageJSON);
            var latestMessageObj = JSON.parse(latestMessageJSON);
            console.log(latestMessageObj.date);

          });
          //
          //   var myNotification = new Notify('Yo dawg!', {
          //     body: 'This is an awesome notification',
          //     notifyShow: onNotifyShow
          //   });
          //
          //   function onNotifyShow() {
          //     console.log('notification was shown!');
          //   }
          //   toggle.scrollToNewMessage();
          // }, function (errorObject) {
          //   console.log("The read failed: " + errorObject.code);
          // });
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
            //broadcast added message
            this.$broadcast('messageAdded', this.message.name);
          }
        }

      }
    });
  }
}
