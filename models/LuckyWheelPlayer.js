const mongoose = require("mongoose");

const LuckyWheelPlayerSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  deviceId: { type: String, required: true },
  eventCode: { type: String, required: true },
  ip: String,
  prize: String,
  playedAt: { type: Date, default: Date.now },
});

// Unique index để tránh cùng phone + eventCode hoặc deviceId + eventCode quay nhiều lần
LuckyWheelPlayerSchema.index({ phone: 1, eventCode: 1 }, { unique: true });
LuckyWheelPlayerSchema.index({ deviceId: 1, eventCode: 1 }, { unique: true });

// Buộc collection đúng tên bạn muốn
module.exports = mongoose.model(
  "LuckyWheelPlayer",
  LuckyWheelPlayerSchema,
  "lucky_wheel_players" // collection name
);
