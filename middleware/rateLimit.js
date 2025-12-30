const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Bạn thao tác quá nhanh, vui lòng thử lại sau!",
  },
});
