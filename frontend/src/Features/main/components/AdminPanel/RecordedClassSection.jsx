import React, { useState } from "react";

import {
    Video,
    PlayCircle,
    Search,
    Link as LinkIcon,
    Clock3,
    CalendarDays,
    BookOpen,
    Save,
    X,
    RefreshCw,
    CheckCircle2,
} from "lucide-react";

import {
    useAdminLiveClasses,
    useUpdateLiveClassRecording,
} from "../../Hooks/liveClass/useLiveClass";

import "../../styles/AdminPanel/RecordedClass.scss";


const RecordedClassSection = () => {

    // ==========================================
    // STATE
    // ==========================================

    const [search, setSearch] = useState("");

    const [selectedClass, setSelectedClass] =
        useState(null);

    const [recordingUrl, setRecordingUrl] =
        useState("");


    // ==========================================
    // GET CLASSES
    // ==========================================

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useAdminLiveClasses();


    // ==========================================
    // UPDATE RECORDING
    // ==========================================

    const {
        mutate: updateRecording,
        isPending: isUpdating,
    } = useUpdateLiveClassRecording();


    // ==========================================
    // ADMIN DATA
    // ==========================================

    const allClasses =
        data?.liveClasses ||
        data?.classes ||
        [];


    // ==========================================
    // ONLY COMPLETED CLASSES
    // ==========================================

    const completedClasses =
        allClasses.filter(
            (item) =>
                item.status === "Completed"
        );


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredClasses =
        completedClasses.filter((item) => {

            const title =
                item.title?.toLowerCase() || "";

            const course =
                typeof item.course === "object"
                    ? item.course?.title?.toLowerCase() || ""
                    : item.course?.toLowerCase() || "";

            const teacher =
                typeof item.teacher === "object"
                    ? (
                        item.teacher?.fullName ||
                        item.teacher?.name ||
                        ""
                    ).toLowerCase()
                    : item.teacher?.toLowerCase() || "";


            const query =
                search.toLowerCase().trim();


            return (
                title.includes(query) ||
                course.includes(query) ||
                teacher.includes(query)
            );

        });


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
        );

    };


    // ==========================================
    // DURATION
    // ==========================================

    const formatDuration = (minutes) => {

        const value =
            Number(minutes || 0);

        const hours =
            Math.floor(value / 60);

        const mins =
            value % 60;


        if (hours > 0) {

            return `${hours}h${
                mins > 0
                    ? ` ${mins}m`
                    : ""
            }`;

        }

        return `${mins}m`;

    };


    // ==========================================
    // OPEN RECORDING MODAL
    // ==========================================

    const handleOpenRecording = (item) => {

        setSelectedClass(item);

        setRecordingUrl(
            item.recordingUrl || ""
        );

    };


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    const handleCloseModal = () => {

        if (isUpdating) return;

        setSelectedClass(null);

        setRecordingUrl("");

    };


    // ==========================================
    // SAVE RECORDING
    // ==========================================

    const handleSaveRecording = (e) => {

        e.preventDefault();


        const url =
            recordingUrl.trim();


        if (!selectedClass?._id) {
            return;
        }


        if (!url) {
            return;
        }


        updateRecording(
            {
                liveClassId:
                    selectedClass._id,

                recordingUrl:
                    url,
            },
            {
                onSuccess: () => {

                    handleCloseModal();

                    refetch();

                },
            }
        );

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {

        return (

            <div className="recorded-class-state">

                <div className="recorded-class-state-card">

                    <div className="recorded-class-spinner"></div>

                    <h3>
                        Loading Completed Classes
                    </h3>

                    <p>
                        Please wait while we fetch your completed classes.
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (isError) {

        return (

            <div className="recorded-class-state">

                <div className="recorded-class-state-card error">

                    <div className="recorded-class-error-icon">
                        !
                    </div>

                    <h3>
                        Unable to Load Classes
                    </h3>

                    <p>
                        {error?.response?.data?.message ||
                            "Something went wrong while loading classes."}
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                    >

                        <RefreshCw size={16} />

                        Try Again

                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="admin-recorded-class-page">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="admin-recorded-class-header">

                <div className="admin-recorded-class-heading">

                    <div className="admin-recorded-class-icon">

                        <PlayCircle size={23} />

                    </div>

                    <div>

                        <h2>
                            Recorded Classes
                        </h2>

                        <p>
                            Add or update recordings for completed live classes.
                        </p>

                    </div>

                </div>

            </div>


            {/* ======================================
                SEARCH
            ====================================== */}

            <div className="admin-recorded-search">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search class, course or instructor..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* ======================================
                EMPTY
            ====================================== */}

            {filteredClasses.length === 0 ? (

                <div className="recorded-class-empty">

                    <div className="recorded-class-empty-icon">

                        <Video size={28} />

                    </div>

                    <h3>
                        No Completed Classes
                    </h3>

                    <p>
                        Completed live classes will appear here.
                    </p>

                </div>

            ) : (

                <div className="admin-recorded-class-list">

                    {filteredClasses.map((item) => {


                        // ==================================
                        // COURSE
                        // ==================================

                        const courseName =
                            typeof item.course === "object"
                                ? item.course?.title
                                : item.course || "Course";


                        // ==================================
                        // TEACHER
                        // ==================================

                        const teacherName =
                            typeof item.teacher === "object"
                                ? (
                                    item.teacher?.fullName ||
                                    item.teacher?.name ||
                                    "Teacher"
                                )
                                : item.teacher || "Teacher";


                        // ==================================
                        // RECORDING
                        // ==================================

                        const hasRecording =
                            Boolean(
                                item.recordingUrl &&
                                item.isRecordingAvailable
                            );


                        return (

                            <div
                                className="admin-recorded-class-card"
                                key={item._id}
                            >

                                {/* LEFT */}

                                <div className="admin-recorded-class-left">

                                    <div className="admin-recorded-class-thumbnail">

                                        {item.thumbnail ? (

                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                            />

                                        ) : (

                                            <PlayCircle size={28} />

                                        )}

                                    </div>


                                    <div className="admin-recorded-class-info">

                                        <span className="admin-recorded-course">

                                            {courseName}

                                        </span>


                                        <h3>

                                            {item.title}

                                        </h3>


                                        <div className="admin-recorded-meta">

                                            <span>

                                                <CalendarDays
                                                    size={14}
                                                />

                                                {formatDate(
                                                    item.scheduledAt
                                                )}

                                            </span>


                                            <span>

                                                {formatTime(
                                                    item.scheduledAt
                                                )}

                                            </span>


                                            <span>

                                                <Clock3
                                                    size={14}
                                                />

                                                {formatDuration(
                                                    item.duration
                                                )}

                                            </span>


                                            <span>

                                                By {teacherName}

                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* RIGHT */}

                                <div className="admin-recorded-class-right">

                                    {hasRecording ? (

                                        <div className="recording-status available">

                                            <CheckCircle2
                                                size={15}
                                            />

                                            Recording Available

                                        </div>

                                    ) : (

                                        <div className="recording-status pending">

                                            Recording Not Added

                                        </div>

                                    )}


                                    <button
                                        type="button"
                                        className="recording-manage-btn"
                                        onClick={() =>
                                            handleOpenRecording(
                                                item
                                            )
                                        }
                                    >

                                        <PlayCircle size={16} />

                                        {hasRecording
                                            ? "Edit Recording"
                                            : "Add Recording"
                                        }

                                    </button>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}


            {/* ======================================
                RECORDING MODAL
            ====================================== */}

            {selectedClass && (

                <div
                    className="recording-modal-overlay"
                    onClick={handleCloseModal}
                >

                    <div
                        className="recording-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* HEADER */}

                        <div className="recording-modal-header">

                            <div>

                                <h3>
                                    Add Class Recording
                                </h3>

                                <p>
                                    {selectedClass.title}
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={handleCloseModal}
                                disabled={isUpdating}
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={
                                handleSaveRecording
                            }
                        >

                            <div className="recording-modal-field">

                                <label>
                                    Recording URL
                                </label>


                                <div className="recording-input-wrapper">

                                    <LinkIcon size={17} />

                                    <input
                                        type="url"
                                        value={recordingUrl}
                                        onChange={(e) =>
                                            setRecordingUrl(
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://drive.google.com/..."
                                        disabled={isUpdating}
                                        required
                                    />

                                </div>

                                <small>
                                    Add Google Drive, YouTube or any
                                    accessible video URL.
                                </small>

                            </div>


                            {/* ACTIONS */}

                            <div className="recording-modal-actions">

                                <button
                                    type="button"
                                    className="recording-cancel-btn"
                                    onClick={
                                        handleCloseModal
                                    }
                                    disabled={isUpdating}
                                >

                                    <X size={16} />

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="recording-save-btn"
                                    disabled={
                                        isUpdating ||
                                        !recordingUrl.trim()
                                    }
                                >

                                    {isUpdating ? (

                                        <>
                                            <span className="recording-save-spinner"></span>

                                            Saving...

                                        </>

                                    ) : (

                                        <>
                                            <Save size={16} />

                                            Save Recording

                                        </>

                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};


export default RecordedClassSection;