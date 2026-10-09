require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const courseRouter = require("./routes/course.route");
const razorpayRouter = require("./routes/razorpay.route");
const contactRouter = require('./routes/contact.route')
const testRouter = require('./routes/test.route');
const practiceRouter = require('./routes/practice.route');
const settingsRouter= require('./routes/settings.route');
const profileRouter = require('./routes/profile.route');
const dashboardRouter = require('./routes/dashboard.route');
const announcementRouter = require('./routes/announcement.route');
const dailyChallengeRouter = require('./routes/dailyChallenge.route');
const notesRouter = require('./routes/notes.route');
const studentRouter = require('./routes/student.route');
const notificationRouter = require('./routes/notification.route');
const liveClassRouter = require('./routes/liveClass.route');
const sectionRouter = require('./routes/sections.route')
const lessonRouter = require('./routes/lesson.route')

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", 'https://5m3np0l7-5173.inc1.devtunnels.ms'],
    credentials: true,
  }),
);


// auth route

app.use("/api/auth", authRouter);

// dashboard route
app.use("/", dashboardRouter);

// dailyChallengeRouter route
app.use("/", dailyChallengeRouter);

// course route

app.use("/", courseRouter);

// section route

app.use("/", sectionRouter);

// lesson route

app.use("/", lessonRouter);

// contact route

app.use("/", contactRouter);

//payment route

app.use("/", razorpayRouter);

// test route

app.use("/",testRouter);

// practice route

app.use("/",practiceRouter);

// Settings route

app.use("/",settingsRouter);

// Settings route

app.use("/",profileRouter);

// Settings route

app.use("/",announcementRouter);

// Notes route

app.use("/",notesRouter);

// Student route
app.use("/",studentRouter);
  

// Notification route
app.use("/",notificationRouter);

// live class

app.use('/',liveClassRouter);

module.exports = app;
