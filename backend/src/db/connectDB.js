const mongoose = require("mongoose");

const startLiveClassScheduler =
  require("../schedulers/liveClass.scheduler");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB connected successfully");

    // ==========================================
    // START LIVE CLASS SCHEDULER
    // ==========================================

    startLiveClassScheduler();

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;
