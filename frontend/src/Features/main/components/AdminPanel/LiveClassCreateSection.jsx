import React, { useState } from "react";
import {
    Video,
    BookOpen,
    Link as LinkIcon,
    CalendarDays,
    Clock3,
    Users,
    LockKeyhole,
    Image as ImageIcon,
    Radio,
    Send,
    RotateCcw,
} from "lucide-react";

import { useCreateLiveClass } from "../../Hooks/liveClass/useLiveClass";
import { useAdminCourses } from "../../Hooks/Admin/Course/useAdminCourses";

import "../../styles/AdminPanel/LiveClassCreate.scss";


const LiveClassCreate = () => {

    // ==========================================
    // FORM STATE
    // ==========================================

    const [formData, setFormData] = useState({
        course: "",
        title: "",
        description: "",

        platform: "Google Meet",

        meetingLink: "",
        meetingId: "",
        meetingPassword: "",

        scheduledAt: "",

        duration: 60,
        maxStudents: 100,

        thumbnail: "",

        isPublished: true,
    });


    // ==========================================
    // COURSES
    // ==========================================

    const {
        data: courseData,
        isLoading: coursesLoading,
    } = useAdminCourses();

    const courses = courseData?.courses || [];


    // ==========================================
    // CREATE LIVE CLASS
    // ==========================================

    const {
        mutate: createLiveClass,
        isPending: isCreating,
    } = useCreateLiveClass();


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };


    // ==========================================
    // RESET
    // ==========================================

    const handleReset = () => {

        setFormData({
            course: "",
            title: "",
            description: "",

            platform: "Google Meet",

            meetingLink: "",
            meetingId: "",
            meetingPassword: "",

            scheduledAt: "",

            duration: 60,
            maxStudents: 100,

            thumbnail: "",

            isPublished: true,
        });
    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.course) {
            return;
        }


        const payload = {

            course: formData.course,

            section: null,

            lesson: null,

            title: formData.title.trim(),

            description:
                formData.description.trim(),

            thumbnail:
                formData.thumbnail.trim(),

            platform:
                formData.platform,

            meetingLink:
                formData.meetingLink.trim(),

            meetingId:
                formData.meetingId.trim(),

            meetingPassword:
                formData.meetingPassword.trim(),

            scheduledAt:
                formData.scheduledAt,

            duration:
                Number(formData.duration),

            maxStudents:
                Number(formData.maxStudents),

            // Recording initially empty
            recordingUrl: "",

            isRecordingAvailable: false,

            isPublished:
                formData.isPublished,
        };


        createLiveClass(
            payload,
            {
                onSuccess: () => {
                    handleReset();
                },
            }
        );
    };


    return (

        <div className="admin-live-class-page">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="admin-live-class-header">

                <div className="admin-live-class-heading">

                    <div className="admin-live-class-heading-icon">

                        <Video size={23} />

                    </div>


                    <div>

                        <h2>
                            Create Live Class
                        </h2>

                        <p>
                            Schedule a live class for your students.
                        </p>

                    </div>

                </div>

            </div>


            {/* ======================================
                FORM
            ====================================== */}

            <form
                className="admin-live-class-form"
                onSubmit={handleSubmit}
            >


                {/* ==================================
                    BASIC INFORMATION
                ================================== */}

                <div className="admin-live-section">

                    <div className="admin-live-section-header">

                        <h3>
                            Basic Information
                        </h3>

                        <p>
                            Add the basic details of your live class.
                        </p>

                    </div>


                    <div className="admin-live-grid">


                        {/* COURSE */}

                        <div className="admin-live-field">

                            <label>
                                Course
                                <span>*</span>
                            </label>


                            <div className="admin-live-input-wrapper">

                                <BookOpen size={17} />


                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    disabled={
                                        coursesLoading ||
                                        isCreating
                                    }
                                    required
                                >

                                    <option value="">

                                        {coursesLoading
                                            ? "Loading courses..."
                                            : "Select Course"
                                        }

                                    </option>


                                    {courses.map((course) => (

                                        <option
                                            key={course._id}
                                            value={course._id}
                                        >
                                            {course.title}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>


                        {/* TITLE */}

                        <div className="admin-live-field">

                            <label>
                                Class Title
                                <span>*</span>
                            </label>


                            <div className="admin-live-input-wrapper">

                                <Video size={17} />


                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. C Language - Functions"
                                    maxLength={120}
                                    disabled={isCreating}
                                    required
                                />

                            </div>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="admin-live-field full-width">

                            <label>
                                Description
                            </label>


                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write a short description about this class..."
                                maxLength={500}
                                disabled={isCreating}
                            />


                            <small>
                                {formData.description.length}/500
                            </small>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    MEETING DETAILS
                ================================== */}

                <div className="admin-live-section">

                    <div className="admin-live-section-header">

                        <h3>
                            Meeting Details
                        </h3>

                        <p>
                            Add the platform and joining information.
                        </p>

                    </div>


                    <div className="admin-live-grid">


                        {/* PLATFORM */}

                        <div className="admin-live-field">

                            <label>
                                Platform
                                <span>*</span>
                            </label>


                            <div className="admin-live-input-wrapper">

                                <Radio size={17} />


                                <select
                                    name="platform"
                                    value={formData.platform}
                                    onChange={handleChange}
                                    disabled={isCreating}
                                >

                                    <option value="Google Meet">
                                        Google Meet
                                    </option>

                                    <option value="Zoom">
                                        Zoom
                                    </option>

                                    <option value="Custom">
                                        Custom
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* MEETING LINK */}

                        <div className="admin-live-field">

                            <label>
                                Meeting Link
                                <span>*</span>
                            </label>


                            <div className="admin-live-input-wrapper">

                                <LinkIcon size={17} />


                                <input
                                    type="url"
                                    name="meetingLink"
                                    value={formData.meetingLink}
                                    onChange={handleChange}
                                    placeholder="https://meet.google.com/..."
                                    disabled={isCreating}
                                    required
                                />

                            </div>

                        </div>


                        {/* MEETING ID */}

                        <div className="admin-live-field">

                            <label>
                                Meeting ID
                            </label>


                            <div className="admin-live-input-wrapper">

                                <Radio size={17} />


                                <input
                                    type="text"
                                    name="meetingId"
                                    value={formData.meetingId}
                                    onChange={handleChange}
                                    placeholder="Optional meeting ID"
                                    disabled={isCreating}
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="admin-live-field">

                            <label>
                                Meeting Password
                            </label>


                            <div className="admin-live-input-wrapper">

                                <LockKeyhole size={17} />


                                <input
                                    type="text"
                                    name="meetingPassword"
                                    value={formData.meetingPassword}
                                    onChange={handleChange}
                                    placeholder="Optional password"
                                    disabled={isCreating}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    SCHEDULE
                ================================== */}

                <div className="admin-live-section">

                    <div className="admin-live-section-header">

                        <h3>
                            Schedule
                        </h3>

                        <p>
                            Choose when the live class will start.
                        </p>

                    </div>


                    <div className="admin-live-grid">


                        {/* DATE & TIME */}

                        <div className="admin-live-field">

                            <label>
                                Scheduled Date & Time
                                <span>*</span>
                            </label>


                            <div className="admin-live-input-wrapper">

                                <CalendarDays size={17} />


                                <input
                                    type="datetime-local"
                                    name="scheduledAt"
                                    value={formData.scheduledAt}
                                    onChange={handleChange}
                                    disabled={isCreating}
                                    required
                                />

                            </div>

                        </div>


                        {/* DURATION */}

                        <div className="admin-live-field">

                            <label>
                                Duration
                                <span>*</span>
                            </label>


                            <div className="admin-live-input-wrapper">

                                <Clock3 size={17} />


                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    min="1"
                                    max="1440"
                                    disabled={isCreating}
                                    required
                                />


                                <span className="admin-input-suffix">
                                    min
                                </span>

                            </div>

                        </div>


                        {/* MAX STUDENTS */}

                        <div className="admin-live-field">

                            <label>
                                Maximum Students
                            </label>


                            <div className="admin-live-input-wrapper">

                                <Users size={17} />


                                <input
                                    type="number"
                                    name="maxStudents"
                                    value={formData.maxStudents}
                                    onChange={handleChange}
                                    min="1"
                                    max="10000"
                                    disabled={isCreating}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    THUMBNAIL
                ================================== */}

                <div className="admin-live-section">

                    <div className="admin-live-section-header">

                        <h3>
                            Thumbnail
                        </h3>

                        <p>
                            Add a thumbnail for this class.
                        </p>

                    </div>


                    <div className="admin-live-field full-width">

                        <label>
                            Thumbnail URL
                        </label>


                        <div className="admin-live-input-wrapper">

                            <ImageIcon size={17} />


                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://..."
                                disabled={isCreating}
                            />

                        </div>

                    </div>

                </div>


                {/* ==================================
                    INFO
                ================================== */}

                <div className="admin-live-info">

                    <Video size={17} />

                    <p>
                        After the live class ends, you can add the
                        recording URL to this same class. The class
                        will then show the recording to students.
                    </p>

                </div>


                {/* ==================================
                    PUBLISH
                ================================== */}

                <div className="admin-live-publish-card">

                    <div>

                        <strong>
                            Publish Live Class
                        </strong>

                        <p>
                            Published classes will be visible to students.
                        </p>

                    </div>


                    <label className="admin-live-switch">

                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleChange}
                            disabled={isCreating}
                        />

                        <span></span>

                    </label>

                </div>


                {/* ==================================
                    ACTIONS
                ================================== */}

                <div className="admin-live-actions">

                    <button
                        type="button"
                        className="admin-live-reset"
                        onClick={handleReset}
                        disabled={isCreating}
                    >

                        <RotateCcw size={16} />

                        Reset

                    </button>


                    <button
                        type="submit"
                        className="admin-live-submit"
                        disabled={
                            isCreating ||
                            coursesLoading
                        }
                    >

                        {isCreating ? (

                            <>
                                <span className="admin-live-spinner"></span>
                                Creating...
                            </>

                        ) : (

                            <>
                                <Send size={16} />
                                Create Live Class
                            </>

                        )}

                    </button>

                </div>

            </form>

        </div>
    );
};


export default LiveClassCreate;