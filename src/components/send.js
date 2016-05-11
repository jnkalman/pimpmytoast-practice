
var send = {
  template: "#sendMessageWindow",
  replace: true,
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
        //broadcast added message
        this.$broadcast('messageAdded', this.message.name);
        this.addUser(this.message.name);
      }
    },

    addUser: function(username) {
      var user = this.$firebaseRefs.onlineUsers.child(username);
      var userData = {name: '', online: 'true'};
      userData.name = username;
      user.set(userData);
    }



  },
  props: ['messages', '']
};

module.exports.send = send;
