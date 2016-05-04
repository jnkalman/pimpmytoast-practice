var $ = require('jquery');
var Vue = require('vue');
var Firebase = require('firebase');

// explicit installation required in module environments
Vue.use(require('vuefire'));
Vue.use(require('vue-resource'));


/* EVENTS VUE */

new Vue({
  // target events div
  el: '#events',
  // set up firebase connection
  firebase: {
    events: new Firebase('https://radiant-torch-6650.firebaseio.com/events')
  },
  // anything within the ready function will run when
  // the application loads, call methods to initialize the app
  // with data
  ready: function() {
    // when the application loads, call the initialize data method
    //this.fetchEvents();
    // var events = this.$firebaseRefs.eventsDataRef;
    this.subscribe();
    //this.$set('events', eventData);
  },

  // initial object
  data: {
    event: { name: '', description: '', date: '' }
  },

  // custom methods registered here
  methods: {
    subscribe: function() {
      // var events = this.events;
      //
      // events.on("value", function(snapshot) {
      //   console.log(snapshot.val());
      // }, function (errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });
    },
    // method to retrieve and set data
    fetchEvents: function() {


    },

    // adds an event to the existing events array
    addEvent: function() {
      if (this.event.name) {
        var events = this.$firebaseRefs.events;
        // add event
        events.push(this.event);
        // reset event
        this.event = {name: '', description: '', date: ''};
      }
    },

    // deletes an event via the passed in index value
    deleteEvent: function(event) {
      if (confirm("Are you sure you want to delete this event?")) {
        // this is going to change in 2.0, so I may need to rewrite this using
        // $index and splice
        this.events.$remove(event);
      }
    }
  }
});
