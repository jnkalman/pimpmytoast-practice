var $ = require('jquery');

module.exports = {

  getLatestMessageData: function(val) {
    var latestMessage = {};

    for (var key in val) {
      if (val.hasOwnProperty(key)) {
        var obj = val[key];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {

              latestMessage.push({ prop : obj[prop]});
          }
        }
      }
    }
    return latestMessage;
  },

  toObject: function(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
    return rv;
  }
}
