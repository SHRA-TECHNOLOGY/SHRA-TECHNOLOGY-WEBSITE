const cron = require("node-cron");
const liveClassModel = require("../models/liveClass.model");


// =====================================================
// UPDATE LIVE CLASS STATUS
// =====================================================

const updateLiveClassStatuses = async () => {

    try {

        const now = new Date();


        // =================================================
        // UPCOMING → LIVE / COMPLETED
        // =================================================

        const upcomingClasses =
            await liveClassModel.find({
                status: "Upcoming",
                isPublished: true,
            });


        for (const liveClass of upcomingClasses) {

            const startTime =
                new Date(liveClass.scheduledAt);


            const endTime =
                new Date(
                    startTime.getTime() +
                    Number(liveClass.duration) *
                    60 *
                    1000
                );


            // =============================================
            // UPCOMING → LIVE
            // =============================================

            if (
                now >= startTime &&
                now < endTime
            ) {

                await liveClassModel.findByIdAndUpdate(
                    liveClass._id,
                    {
                        $set: {
                            status: "Live",
                        },
                    }
                );
            }


            // =============================================
            // UPCOMING → COMPLETED
            // =============================================

            else if (now >= endTime) {

                await liveClassModel.findByIdAndUpdate(
                    liveClass._id,
                    {
                        $set: {
                            status: "Completed",
                        },
                    }
                );
            }

        }


        // =================================================
        // LIVE → COMPLETED
        // =================================================

        const liveClasses =
            await liveClassModel.find({
                status: "Live",
                isPublished: true,
            });


        for (const liveClass of liveClasses) {

            const startTime =
                new Date(liveClass.scheduledAt);


            const endTime =
                new Date(
                    startTime.getTime() +
                    Number(liveClass.duration) *
                    60 *
                    1000
                );


            if (now >= endTime) {

                await liveClassModel.findByIdAndUpdate(
                    liveClass._id,
                    {
                        $set: {
                            status: "Completed",
                        },
                    }
                );
            }

        }

    } catch (error) {

        console.error(
            "Live Class Scheduler Error:",
            error
        );

    }

};


// =====================================================
// START SCHEDULER
// =====================================================

const startLiveClassScheduler = () => {

    // Every 1 minute

    cron.schedule("* * * * *", async () => {

        await updateLiveClassStatuses();

    });

};


module.exports = startLiveClassScheduler;