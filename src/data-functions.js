var $ = require('jquery');

module.exports = {

  getData: function(val, format) {
    for (var key in val) {
      if (val.hasOwnProperty(key)) {
        var obj = val[key];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              format[prop] = obj[prop];
          }
        }
      }
    }


    return format;
  },

  toObject: function(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
    return rv;
  }
}
