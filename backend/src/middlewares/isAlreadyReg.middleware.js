const authModel = require("../models/auth.model");
const BlackListModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");

async function isAlreadyReg(req, res, next) {

    try {

        // ==========================================
        // GET TOKEN
        // ==========================================

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                code: "AUTH_REQUIRED",
                message: "Login is required.",
            });
        }


        // ==========================================
        // BLACKLIST CHECK
        // ==========================================

        const isBlackList =
            await BlackListModel.findOne({
                token,
            });

        if (isBlackList) {
            return res.status(401).json({
                success: false,
                code: "TOKEN_REVOKED",
                message: "Your session has been revoked. Please login again.",
            });
        }


        // ==========================================
        // VERIFY JWT
        // ==========================================

        let decoded;

        try {

            decoded = jwt.verify(
                token,
                process.env.SECRET_KEY
            );

        } catch (error) {

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    code: "TOKEN_EXPIRED",
                    message: "Your session has expired. Please login again.",
                });
            }

            return res.status(401).json({
                success: false,
                code: "INVALID_TOKEN",
                message: "Invalid authentication token.",
            });
        }


        // ==========================================
        // SESSION ID REQUIRED
        // ==========================================

        if (!decoded.sessionId) {

            return res.status(401).json({
                success: false,
                code: "SESSION_INVALID",
                message: "Invalid session. Please login again.",
            });

        }


        // ==========================================
        // FIND USER
        // ==========================================

        const user =
            await authModel.findById(decoded.id);

        if (!user) {

            return res.status(401).json({
                success: false,
                code: "USER_NOT_FOUND",
                message: "User account not found.",
            });

        }


        // ==========================================
        // CHECK ACTIVE SESSION
        // ==========================================

        const activeSession =
            user.activeSession;


        if (
            !activeSession?.sessionId
        ) {

            return res.status(401).json({
                success: false,
                code: "SESSION_INVALID",
                message:
                    "No active session found. Please login again.",
            });

        }


        // ==========================================
        // COMPARE SESSION ID
        // ==========================================

        if (
            decoded.sessionId !==
            activeSession.sessionId
        ) {

            return res.status(401).json({
                success: false,
                code: "SESSION_REPLACED",
                message:
                    "Your account is active on another device. Please login again.",
            });

        }


        // ==========================================
        // CHECK SESSION EXPIRY
        // ==========================================

        if (
            !activeSession.expiresAt ||
            new Date(activeSession.expiresAt) <= new Date()
        ) {

            await authModel.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        "activeSession.sessionId": null,
                        "activeSession.device": null,
                        "activeSession.createdAt": null,
                        "activeSession.expiresAt": null,
                    },
                }
            );


            return res.status(401).json({
                success: false,
                code: "SESSION_EXPIRED",
                message:
                    "Your session has expired. Please login again.",
            });

        }


        // ==========================================
        // ATTACH USER
        // ==========================================

        req.user = {

            id: user._id,

            username: user.username,

            role: user.role,

            sessionId:
                activeSession.sessionId,

        };


        // ==========================================
        // NEXT
        // ==========================================

        next();

    } catch (error) {

        console.error(
            "Authentication Middleware Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Authentication service error.",
        });

    }

}

module.exports = {
    isAlreadyReg,
};