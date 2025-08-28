const { default: mongoose } = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notifyID: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  users: {
    type: Object,
    required: false,
  },
});

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;