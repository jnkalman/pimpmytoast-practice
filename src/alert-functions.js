var Notify = require('notifyjs');

module.exports = {

  showNotification: function(message) {
    var notification = new Notify(message.name, {
      body: message.description,
      tag: message.date,
      notifyShow: this.onShowNotification,
      notifyClose: this.onCloseNotification,
      notifyClick: this.onClickNotification,
      notifyError: this.onErrorNotification,
      timeout: 4
    });

    if (!Notify.needsPermission) {
      notification.show();
    } else if (Notify.isSupported()) {
      Notify.requestPermission(this.onPermissionGranted, this.onPermissionDenied);
    }
  },
  onShowNotification: function() {
    console.log('notification is shown!');
  },

  onCloseNotification: function() {
    console.log('notification is closed!');
  },

  onClickNotification: function() {
    console.log('notification was clicked!');
  },

  onErrorNotification: function() {
    console.error('Error showing notification. You may need to request permission.');
  },

  onPermissionGranted: function() {
    console.log('Permission has been granted by the user');
    this.showNotification();
  },

  onPermissionDenied: function() {
    console.warn('Permission has been denied by the user');
  },

  playNotificationSound: function(volume) {
    // play notification sound
    var notificationSound = new Audio('../sounds/notification-sound.mp3');
    notificationSound.volume = volume;
    notificationSound.play();
  }
}
