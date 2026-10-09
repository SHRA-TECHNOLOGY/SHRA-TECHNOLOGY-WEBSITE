const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        // ==========================================
        // BASIC INFORMATION
        // ==========================================

        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        // ==========================================
        // FILE INFORMATION
        // ==========================================

        file: {
            url: {
                type: String,
                required: true,
            },

            publicId: {
                type: String,
                default: null,
            },

            originalName: {
                type: String,
                default: null,
            },

            mimeType: {
                type: String,
                default: "application/pdf",
            },

            size: {
                type: Number,
                default: 0,
            },

            sizeFormatted: {
                type: String,
                default: null,
            },

            pages: {
                type: Number,
                default: 0,
            },
        },

        // ==========================================
        // NOTE DETAILS
        // ==========================================

        difficulty: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Advanced",
            ],
            default: "Beginner",
        },

        language: {
            type: String,
            enum: [
                "English",
                "Hindi",
                "Hinglish",
            ],
            default: "English",
        },

        // Used only by MongoDB text index.
        // It prevents "Hinglish" from being treated
        // as a MongoDB text-search language.
        searchLanguage: {
            type: String,
            default: "none",
            select: false,
        },

        // ==========================================
        // DOWNLOAD
        // ==========================================

        downloads: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ==========================================
        // COURSE CONNECTION
        // ==========================================

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            default: null,
        },

        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            default: null,
        },

        // ==========================================
        // PUBLISH
        // ==========================================

        isPublished: {
            type: Boolean,
            default: true,
        },

        order: {
            type: Number,
            default: 0,
        },

        // ==========================================
        // UPLOADED BY
        // ==========================================

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },

    {
        timestamps: true,
    }
);

// ==========================================
// TEXT SEARCH INDEX
// ==========================================

notesSchema.index(
    {
        title: "text",
        subject: "text",
        description: "text",
    },
    {
        language_override: "searchLanguage",
        default_language: "none",
    }
);

// ==========================================
// OTHER INDEXES
// ==========================================

notesSchema.index({
    subject: 1,
    difficulty: 1,
});

notesSchema.index({
    isPublished: 1,
    createdAt: -1,
});

// ==========================================
// MODEL
// ==========================================

const notesModel = mongoose.model(
    "Notes",
    notesSchema
);

module.exports = notesModel;