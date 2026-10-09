const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    city: {
      type: String,
      default: "",
    },

    number: {
      type: Number,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: null,
    },

    profileImageId: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: "",
    },

    // Role
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },

    // Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Gamification
    xp: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },

    level: {
      type: Number,
      default: 1,
    },

    streak: {
      current: {
        type: Number,
        default: 0,
      },

      longest: {
        type: Number,
        default: 0,
      },

      lastActivityDate: {
        type: Date,
        default: null,
      },
    },

    notificationSettings: {
      enabled: {
        type: Boolean,
        default: true,
      },
    },

    totalLearningHours: {
      type: Number,
      default: 0,
    },

    totalProblemsSolved: {
      type: Number,
      default: 0,
    },

    // Login
    lastLogin: Date,

    // Account
    isBlocked: {
      type: Boolean,
      default: false,
    },

    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },

    activeSession: {
      sessionId: {
        type: String,
        default: null,
      },

      device: {
        type: String,
        default: null,
      },

      createdAt: {
        type: Date,
        default: null,
      },

      expiresAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ xp: -1 });

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
