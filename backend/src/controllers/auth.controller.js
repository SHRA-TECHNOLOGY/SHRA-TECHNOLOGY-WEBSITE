const userModel = require("../models/auth.model");
const BlackListModel = require("../models/blacklist.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");

const { sendResetMail } = require("../services/forgotMail.service");


// ======================================================
// SESSION CONFIG (7 days vaild session)
// ======================================================

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;


// ======================================================
// CREATE SESSION
// ======================================================

const createSession = async (user, req) => {

    const sessionId = crypto.randomUUID();

    const createdAt = new Date();

    const expiresAt = new Date(
        Date.now() + SESSION_DURATION
    );

    // user-agent mein device ka naam hota h.
    const device =
        req.headers["user-agent"] ||
        "Unknown Device";


    user.activeSession = {

        sessionId,

        device,

        createdAt,

        expiresAt,

    };


    await user.save();


    return {
        sessionId,
        expiresAt,
    };
};


// ======================================================
// CREATE JWT
// ======================================================

const createToken = (user, sessionId) => {

    return jwt.sign(

        {
            id: user._id,

            username: user.username,

            role: user.role,

            sessionId,
        },

        process.env.SECRET_KEY,

        {
            expiresIn: "7d",
        }

    );
};


// ======================================================
// SET COOKIE
// ======================================================

const setAuthCookie = (res, token) => {

    res.cookie(
        "token",
        token,
        {

            httpOnly: true,

            secure: true,

            sameSite: "none",

            maxAge: SESSION_DURATION,

        }
    );
};


// ======================================================
// CLEAR SESSION
// ======================================================

const clearUserSession = async (userId) => {

    await userModel.findByIdAndUpdate(

        userId,

        {
            $set: {

                "activeSession.sessionId": null,

                "activeSession.device": null,

                "activeSession.createdAt": null,

                "activeSession.expiresAt": null,

            },
        }

    );
};


// ======================================================
// REGISTER
// ======================================================

async function regUser(req, res) {

    const {
        fullName,
        username,
        number,
        city,
        email,
        password,
    } = req.body;


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !fullName?.trim() ||
        !username?.trim() ||
        !number?.trim() ||
        !city?.trim() ||
        !email?.trim() ||
        !password
    ) {

        return res.status(400).json({

            success: false,

            message: "All fields are required.",

        });

    }


    try {

        const normalizedEmail =
            email.trim().toLowerCase();


        // ==================================================
        // CHECK EXISTING USER
        // ==================================================

        const existingUser =
            await userModel.findOne({

                $or: [

                    {
                        username:
                            username.trim(),
                    },

                    {
                        email:
                            normalizedEmail,
                    },

                    {
                        number:
                            number.trim(),
                    },

                ],

            });


        if (existingUser) {

            return res.status(409).json({

                success: false,

                message:
                    "Username, email or phone number is already registered.",

            });

        }


        // ==================================================
        // PASSWORD HASH
        // ==================================================

        const hash =
            await bcrypt.hash(password, 10);


        // ==================================================
        // CREATE USER
        // ==================================================

        const user =
            await userModel.create({

                fullName:
                    fullName.trim(),

                username:
                    username.trim(),

                number:
                    number.trim(),

                city:
                    city.trim(),

                email:
                    normalizedEmail,

                password:
                    hash,

            });


        // ==================================================
        // CREATE SESSION
        // ==================================================

        const {
            sessionId,
        } = await createSession(
            user,
            req
        );


        // ==================================================
        // JWT
        // ==================================================

        const token =
            createToken(
                user,
                sessionId
            );


        setAuthCookie(
            res,
            token
        );


        return res.status(201).json({

            success: true,

            message:
                "Registration successful.",

            user: {

                id: user._id,

                username:
                    user.username,

                fullName:
                    user.fullName,

                email:
                    user.email,

                role:
                    user.role,

            },

        });

    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to register user.",

        });

    }
}


// ======================================================
// LOGIN
// ======================================================

async function loginUser(req, res) {

    const {
        email,
        password,
    } = req.body;


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !email?.trim() ||
        !password
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Email and password are required.",

        });

    }


    try {

        const normalizedEmail =
            email.trim().toLowerCase();


        // ==================================================
        // FIND USER
        // ==================================================

        const user =
            await userModel.findOne({

                email:
                    normalizedEmail,

            });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password.",

            });

        }


        // ==================================================
        // PASSWORD
        // ==================================================

        const isValidPassword =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isValidPassword) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password.",

            });

        }


        // ==================================================
        // CHECK ACTIVE SESSION
        // ==================================================

        const now = new Date();


        const hasActiveSession =

            user.activeSession?.sessionId &&

            user.activeSession?.expiresAt &&

            new Date(
                user.activeSession.expiresAt
            ) > now;


        if (hasActiveSession) {

            return res.status(409).json({

                success: false,

                code:
                    "ALREADY_LOGGED_IN",

                message:
                    "This account is already logged in on another device.",

            });

        }


        // ==================================================
        // REMOVE EXPIRED SESSION
        // ==================================================

        if (
            user.activeSession?.sessionId
        ) {

            await clearUserSession(
                user._id
            );

        }


        // ==================================================
        // CREATE NEW SESSION
        // ==================================================

        const {
            sessionId,
        } = await createSession(
            user,
            req
        );


        // ==================================================
        // CREATE JWT
        // ==================================================

        const token =
            createToken(
                user,
                sessionId
            );


        // ==================================================
        // COOKIE
        // ==================================================

        setAuthCookie(
            res,
            token
        );


        // ==================================================
        // RESPONSE
        // ==================================================

        return res.status(200).json({

            success: true,

            message:
                "Login successful.",

            user: {

                id: user._id,

                username:
                    user.username,

                fullName:
                    user.fullName,

                email:
                    user.email,

                role:
                    user.role,

            },

        });

    } catch (error) {

        console.error(
            "Login Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Something went wrong during login.",

        });

    }
}


// ======================================================
// FORGOT PASSWORD
// ======================================================

async function forgotPassword(req, res) {

    try {

        const {
            email,
        } = req.body;


        if (!email?.trim()) {

            return res.status(400).json({

                success: false,

                message:
                    "Email is required.",

            });

        }


        const resetToken =
            crypto.randomBytes(32)
                .toString("hex");


        const hashResetToken =
            crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");


        const user =
            await userModel.findOne({

                email:
                    email.trim().toLowerCase(),

            });


        // Do not reveal whether account exists

        if (!user) {

            return res.status(200).json({

                success: true,

                message:
                    "If an account with that email exists, we've sent a password reset link.",

            });

        }


        // ==================================================
        // RESET RATE LIMIT
        // ==================================================

        if (
            user.resetPasswordToken &&
            user.resetPasswordExpire >
                Date.now()
        ) {

            return res.status(429).json({

                success: false,

                message:
                    "A password reset link has already been sent. Please check your email or wait 15 minutes.",

            });

        }


        user.resetPasswordToken =
            hashResetToken;

        user.resetPasswordExpire =
            Date.now() +
            15 * 60 * 1000;


        await user.save();


        const resetUrl =
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;


        await sendResetMail({

            resetUrl,

            email: user.email,

        });


        return res.status(200).json({

            success: true,

            message:
                "Password reset link sent successfully.",

        });

    } catch (error) {

        console.error(
            "Forgot Password Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to send reset link.",

        });

    }
}


// ======================================================
// RESET PASSWORD
// ======================================================

async function resetPassword(req, res) {

    try {

        const {
            newPassword,
        } = req.body;


        const {
            resetToken,
        } = req.params;


        if (
            !newPassword ||
            newPassword.length < 6
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 6 characters.",

            });

        }


        const hashResetToken =
            crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");


        const user =
            await userModel.findOne({

                resetPasswordToken:
                    hashResetToken,

                resetPasswordExpire: {
                    $gt: Date.now(),
                },

            });


        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid or expired reset token.",

            });

        }


        // ==================================================
        // NEW PASSWORD
        // ==================================================

        const hashNewPassword =
            await bcrypt.hash(
                newPassword,
                10
            );


        user.password =
            hashNewPassword;

        user.resetPasswordToken =
            undefined;

        user.resetPasswordExpire =
            undefined;


        // ==================================================
        // IMPORTANT
        // INVALIDATE OLD SESSION
        // ==================================================

        user.activeSession = {

            sessionId: null,

            device: null,

            createdAt: null,

            expiresAt: null,

        };


        await user.save();


        // ==================================================
        // CLEAR COOKIE
        // ==================================================

        res.clearCookie(
            "token",
            {

                httpOnly: true,

                secure: true,

                sameSite: "none",

            }
        );


        return res.status(200).json({

            success: true,

            message:
                "Password reset successfully. Please login again.",

        });

    } catch (error) {

        console.error(
            "Reset Password Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to reset password.",

        });

    }
}


// ======================================================
// LOGOUT
// ======================================================

async function logoutUser(req, res) {

    try {

        const token =
            req.cookies?.token;


        // ==================================================
        // CLEAR SESSION
        // ==================================================

        if (req.user?.id) {

            await clearUserSession(
                req.user.id
            );

        }


        // ==================================================
        // BLACKLIST TOKEN
        // ==================================================

        if (token) {

            await BlackListModel.create({

                token,

            });

        }


        // ==================================================
        // CLEAR COOKIE
        // ==================================================

        res.clearCookie(
            "token",
            {

                httpOnly: true,

                secure: true,

                sameSite: "none",

            }
        );


        return res.status(200).json({

            success: true,

            message:
                "Logout successful.",

        });

    } catch (error) {

        console.error(
            "Logout Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error.",

        });

    }
}


// ======================================================
// GET ME
// ======================================================

async function getMe(req, res) {
    try {
        const info = await userModel.findById(req.user.id);

        if (!info) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User information fetched successfully.",
            user: {
                id: info._id,
                username: info.username,
                fullName: info.fullName,
                email: info.email,
                role: info.role,
            },
        });
    } catch (error) {
        console.error("Get Me Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
}


// ======================================================
// GOOGLE LOGIN
// ======================================================

async function googleLogin(req, res) {

    try {

        const {
            token,
        } = req.body;


        if (!token) {

            return res.status(400).json({

                success: false,

                message:
                    "Google token is required.",

            });

        }


        const client =
            new OAuth2Client(
                process.env.GOOGLE_CLIENT_ID
            );


        const ticket =
            await client.verifyIdToken({

                idToken:
                    token,

                audience:
                    process.env.GOOGLE_CLIENT_ID,

            });


        const payload =
            ticket.getPayload();


        if (!payload?.email) {

            return res.status(400).json({

                success: false,

                message:
                    "Google account email not found.",

            });

        }


        // ==================================================
        // FIND USER
        // ==================================================

        let user =
            await userModel.findOne({

                email:
                    payload.email
                        .toLowerCase(),

            });


        // ==================================================
        // CREATE GOOGLE USER
        // ==================================================

        if (!user) {

            user =
                await userModel.create({

                    username:
                        payload.name,

                    fullName:
                        payload.name,

                    email:
                        payload.email
                            .toLowerCase(),

                    password:
                        null,

                    googleId:
                        payload.sub,

                    avatar:
                        payload.picture,

                    provider:
                        "google",

                });

        }


        // ==================================================
        // CHECK ACTIVE SESSION
        // ==================================================

        const hasActiveSession =

            user.activeSession?.sessionId &&

            user.activeSession?.expiresAt &&

            new Date(
                user.activeSession.expiresAt
            ) > new Date();


        if (hasActiveSession) {

            return res.status(409).json({

                success: false,

                code:
                    "ALREADY_LOGGED_IN",

                message:
                    "This account is already logged in on another device.",

            });

        }


        // ==================================================
        // CREATE SESSION
        // ==================================================

        const {
            sessionId,
        } = await createSession(
            user,
            req
        );


        // ==================================================
        // JWT
        // ==================================================

        const jwtToken =
            createToken(
                user,
                sessionId
            );


        setAuthCookie(
            res,
            jwtToken
        );


        return res.status(200).json({

            success: true,

            message:
                "Google login successful.",

            user: {

                id: user._id,

                username:
                    user.username,

                fullName:
                    user.fullName,

                email:
                    user.email,

                role:
                    user.role,

            },

        });

    } catch (error) {

        console.error(
            "Google Login Error:",
            error
        );


        return res.status(401).json({

            success: false,

            message:
                "Google authentication failed.",

        });

    }
}


// ======================================================
// EXPORT
// ======================================================

module.exports = {

    regUser,

    loginUser,

    forgotPassword,

    resetPassword,

    logoutUser,

    getMe,

    googleLogin,

};