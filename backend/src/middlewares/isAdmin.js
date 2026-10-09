const isAdmin = (req, res, next) => {
    try {

        // User authentication middleware se aana chahiye
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first.",
            });
        }


        // Admin role check
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin access required.",
            });
        }


        // Admin hai → next middleware/controller
        next();

    } catch (error) {

        console.error("Admin Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: "Authorization failed",
            error: error.message,
        });
    }
};


module.exports = isAdmin;