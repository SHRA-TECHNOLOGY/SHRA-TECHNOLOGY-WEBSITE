const mongoose = require("mongoose");

const userBadgeSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },


    // ==========================================
    // BADGE
    // ==========================================

    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
      required: true,
      index: true,
    },


    // ==========================================
    // WHEN BADGE WAS EARNED
    // ==========================================

    earnedAt: {
      type: Date,
      default: Date.now,
    },


    // ==========================================
    // EXTRA DATA
    // ==========================================

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);


// ==========================================
// SAME BADGE DUPLICATE NA HO
// ==========================================

userBadgeSchema.index(
  {
    user: 1,
    badge: 1,
  },
  {
    unique: true,
  }
);

const userBadgeModel = mongoose.model("UserBadge",
  userBadgeSchema);


module.exports = userBadgeModel;
