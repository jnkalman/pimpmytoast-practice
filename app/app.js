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
    dataRef: new Firebase('https://radiant-torch-6650.firebaseio.com/'),

    eventData: {
      source: new Firebase('https://radiant-torch-6650.firebaseio.com/'),
      asObject: true
    }
  },
  // register any values or collections that hold data
  // for the application - where viewmodel data is registered
  data: {
    event: {name: '', description: '', date: ''},
    events: []
  },

  // anything within the ready function will run when
  // the application loads, call methods to initialize the app
  // with data
  ready: function() {
    // when the application loads, call the initialize data method
    this.fetchEvents();

    //this.$set('events', eventData);
  },

  // custom methods registered here
  methods: {

    // method to retrieve and set data
    fetchEvents: function() {
      var events = this.$firebaseRefs.dataRef;
      // $set is a convenience method provided by Vue that is similar to pushing
      // data onto an array
      //
      // this.$get('events', function() {
      //   try {
      //
      //   } catch(err) {}
      // });
      this.$firebaseRefs.eventData.on("value", function(snapshot) {
        console.log(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });


      // ^^ Temp code until JSON get/parse \/ works

      /*$.getJSON('data.json');
      try {
        $.getJSON
      }*/
      // this.$http.get('/data.json').then(function(events) {
      //   this.$set('events', events);
      // }).catch(function(error) {
      //   console.log(error);
      // });

    },

    // adds an event to the existing events array
    addEvent: function() {
      if (this.event.name) {
        // add event
        this.events.push(this.event);
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
