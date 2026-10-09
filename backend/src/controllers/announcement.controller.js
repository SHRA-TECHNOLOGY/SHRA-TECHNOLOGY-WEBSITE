const announcementMode = require("../models/announcement.model");

async function createAnnouncement(req, res) {
  try {
    const { type, title, description, course, contest, startDate, endDate, isPublished } = req.body;
    const announcement = await announcementMode.create({
      type,
      title,
      description,
      course,
      contest,
      startDate,
      endDate,
      isPublished
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createAnnouncement,
};