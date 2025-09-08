const NotificationModel = require("../models/notification");

exports.addNotification = async (data) => {
  try {
    const newNotification = new NotificationModel(data);

    const savedNotification = await newNotification.save();

    console.log("Notification added successfully:", savedNotification);
    return savedNotification;
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error; // Handle the error as needed
  }
};
