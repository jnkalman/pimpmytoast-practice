/* EVENTS VUE */

new Vue({
  // target events div
  el: '#events',

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
  },

  // custom methods registered here
  methods: {

    // method to retrieve and set data
    fetchEvents: function() {
      var events = [
        {
          id: 1,
          name: 'TIFF',
          description: 'Toronto International Film Festival',
          date: '2015-09-10'
        },
        {
          id: 2,
          name: 'The Martian Premiere',
          description: 'The Martian comes to theatres.',
          date: '2015-10-02'
        },
        {
          id: 3,
          name: 'SXSW',
          description: 'Music, film and interactive festival in Austin, TX.',
          date: '2016-03-11'
        }
      ];

      // $set is a convenience method provided by Vue that is similar to pushing
      // data onto an array
      this.$set('events', events);
    },

    // adds an event to the existing events array
    addEvent: function() {
      if (this.event.name) {
        // add event
        this.events.push(this.event);
        // reset event
        this.event = {name: '', description: '', date: ''};
      }
    }
  }
});
