const notesModel = require("../models/notes.model");
const courseModel = require("../models/course.model");
const sectionModel = require("../models/section.course.model");
const slugify = require("slugify");

const { google } = require("googleapis");
const axios = require("axios");
const { PDFParse } = require("pdf-parse");


// =====================================================
// GOOGLE DRIVE AUTH
// =====================================================

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
            ?.replace(/\\n/g, "\n"),
    },

    scopes: [
        "https://www.googleapis.com/auth/drive.readonly",
    ],
});

const drive = google.drive({
    version: "v3",
    auth,
});


// =====================================================
// EXTRACT DRIVE FILE ID
// =====================================================

const extractDriveFileId = (url) => {

    if (!url) return null;

    const patterns = [
        /\/file\/d\/([^/]+)/,
        /[?&]id=([^&]+)/,
        /\/open\?id=([^&]+)/,
    ];

    for (const pattern of patterns) {

        const match = url.match(pattern);

        if (match) {
            return match[1];
        }
    }

    return null;
};


// =====================================================
// GET COURSES
// =====================================================

const getCoursesForNotes = async (req, res) => {

    try {

        const courses = await courseModel
            .find({
                status: "Published",
            })
            .select("_id title slug")
            .sort({ title: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            courses,
        });

    } catch (error) {

        console.error(
            "Get Courses For Notes Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message,
        });
    }
};


// =====================================================
// GET SECTIONS
// =====================================================

const getSectionsForNotes = async (req, res) => {

    try {

        const { courseId } = req.params;

        if (!courseId) {

            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const course = await courseModel
            .findOne({
                _id: courseId,
                status: "Published",
            })
            .select("_id title")
            .lean();

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const sections = await sectionModel
            .find({
                course: courseId,
            })
            .select("_id title slug order")
            .sort({ order: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            message: "Sections fetched successfully",
            sections,
        });

    } catch (error) {

        console.error(
            "Get Sections For Notes Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch sections",
            error: error.message,
        });
    }
};


// =====================================================
// CREATE NOTE FROM GOOGLE DRIVE URL
// =====================================================

const createNote = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            title,
            subject,
            description,
            course,
            section,
            difficulty,
            language,
            fileUrl,
        } = req.body;

        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        if (
            !title?.trim() ||
            !subject?.trim() ||
            !description?.trim() ||
            !course ||
            !fileUrl?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, subject, description, course and Drive URL are required",
            });
        }

        // ==========================================
        // DRIVE FILE ID
        // ==========================================

        const fileId = extractDriveFileId(fileUrl);

        if (!fileId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Google Drive file URL",
            });
        }

        // ==========================================
        // GET DRIVE METADATA
        // ==========================================

        let driveFile;

        try {
            const response = await drive.files.get({
                fileId,
                fields: "id,name,mimeType,size,webViewLink",
                supportsAllDrives: true,
            });

            driveFile = response.data;

        } catch (error) {
            console.error(
                "Google Drive Metadata Error:",
                error.response?.data || error.message
            );

            return res.status(400).json({
                success: false,
                message:
                    "Unable to access Google Drive file. Make sure the file is accessible.",
            });
        }

        // ==========================================
        // PDF VALIDATION
        // ==========================================

        if (driveFile.mimeType !== "application/pdf") {
            return res.status(400).json({
                success: false,
                message: "Only PDF files are allowed",
            });
        }

        // ==========================================
        // FILE SIZE
        // ==========================================

        const fileSize = Number(driveFile.size || 0);

        const sizeFormatted =
            `${(fileSize / 1024 / 1024).toFixed(2)} MB`;

        // ==========================================
        // GET PDF PAGE COUNT
        // ==========================================

        let pages = 0;

        try {
            // Download PDF using authenticated Google Drive client
            const downloadResponse = await drive.files.get(
                {
                    fileId,
                    alt: "media",
                    supportsAllDrives: true,
                },
                {
                    responseType: "arraybuffer",
                }
            );

            const pdfBuffer = Buffer.from(downloadResponse.data);

            // ------------------------------------------
            // pdf-parse v2+
            // ------------------------------------------

            const { PDFParse } = require("pdf-parse");

            const parser = new PDFParse({
                data: pdfBuffer,
            });

            const pdfData = await parser.getInfo({
                parsePageInfo: true,
            });

            pages = pdfData.total || 0;

            await parser.destroy();

        } catch (error) {
            console.error(
                "PDF Page Count Error:",
                error.message
            );

            // Page count unavailable ho to bhi note save hoga
            pages = 0;
        }

        // ==========================================
        // COURSE CHECK
        // ==========================================

        const courseExists = await courseModel
            .findOne({
                _id: course,
                status: "Published",
            })
            .select("_id")
            .lean();

        if (!courseExists) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // ==========================================
        // SECTION CHECK
        // ==========================================

        if (section) {
            const sectionExists = await sectionModel
                .findOne({
                    _id: section,
                    course,
                })
                .select("_id")
                .lean();

            if (!sectionExists) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Section not found for selected course",
                });
            }
        }

        // ==========================================
        // GENERATE SLUG
        // ==========================================

        let slug = slugify(title, {
            lower: true,
            strict: true,
            trim: true,
        });

        // ==========================================
        // UNIQUE SLUG
        // ==========================================

        const existingSlug = await notesModel
            .findOne({ slug })
            .select("_id")
            .lean();

        if (existingSlug) {
            slug = `${slug}-${Date.now()}`;
        }

        // ==========================================
        // AUTO ORDER
        // ==========================================

        const lastNote = await notesModel
            .findOne({
                course,
                section: section || null,
            })
            .sort({
                order: -1,
            })
            .select("order")
            .lean();

        const nextOrder = lastNote
            ? lastNote.order + 1
            : 1;

        // ==========================================
        // CREATE NOTE
        // ==========================================

        const note = await notesModel.create({
            title: title.trim(),

            slug,

            subject: subject.trim(),

            description: description.trim(),

            file: {
                url: fileUrl.trim(),

                publicId: fileId,

                originalName: driveFile.name,

                mimeType: driveFile.mimeType,

                size: fileSize,

                sizeFormatted,

                pages,
            },

            difficulty: difficulty || "Beginner",

            language: language || "English",

            downloads: 0,

            course,

            section: section || null,

            isPublished: true,

            order: nextOrder,

            uploadedBy: userId,

            uploadedAt: new Date(),
        });

        // ==========================================
        // POPULATE
        // ==========================================

        const populatedNote = await notesModel
            .findById(note._id)
            .populate(
                "course",
                "title slug"
            )
            .populate(
                "section",
                "title slug order"
            )
            .populate(
                "uploadedBy",
                "name email"
            )
            .lean();

        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(201).json({
            success: true,

            message: "Notes created successfully",

            note: populatedNote,
        });

    } catch (error) {
        console.error(
            "Create Note Error:",
            error
        );

        return res.status(500).json({
            success: false,

            message: "Failed to create note",

            error: error.message,
        });
    }
};

//=====================================================
// GET ALL NOTES
//=====================================================


const getAllNotes = async (req, res) => {
    try {
        const notes = await notesModel
            .find({ isPublished: true })
            .populate(
                "course",
                "title slug"
            )
            .populate(
                "section",
                "title slug order"
            )
            .populate(
                "uploadedBy",
                "name email"
            )
            .sort({
                createdAt: -1,
            })
            .lean();

        return res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            count: notes.length,
            notes,
        });

    } catch (error) {
        console.error(
            "Get All Notes Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
            error: error.message,
        });
    }
};


module.exports = {
    getCoursesForNotes,
    getSectionsForNotes,
    createNote,
    getAllNotes,
};