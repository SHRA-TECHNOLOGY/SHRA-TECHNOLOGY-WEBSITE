import React, { useState } from "react";

import {
    BellPlus,
    Send,
    X,
    Users,
    AlertCircle,
} from "lucide-react";

import { useAllStudents } from "../../Hooks/Admin/Student/useStudent";
import { useCreateNotification } from "../../Hooks/Notification/useNotification";

import "../../styles/AdminPanel/AdminNotification.scss";


const AdminNotification = () => {

    // ==========================================
    // FORM STATE
    // ==========================================

    const [formData, setFormData] = useState({
        user: "",
        title: "",
        message: "",
        type: "announcement",
        priority: "normal",
        actionUrl: "",
        image: "",
        expiresAt: "",
    });


    // ==========================================
    // STUDENTS
    // ==========================================

    const {
        data: studentData,
        isLoading: studentsLoading,
        isError: studentsError,
    } = useAllStudents();


    const students = studentData?.students || [];


    // ==========================================
    // CREATE NOTIFICATION
    // ==========================================

    const {
        mutate: createNotification,
        isPending,
    } = useCreateNotification();


    // ==========================================
    // CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();


        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (!formData.user) {
            return;
        }


        if (!formData.title.trim()) {
            return;
        }


        if (!formData.message.trim()) {
            return;
        }


        // ------------------------------------------
        // PAYLOAD
        // ------------------------------------------

        const payload = {

            user: formData.user,

            title: formData.title.trim(),

            message: formData.message.trim(),

            type: formData.type,

            priority: formData.priority,

            actionUrl:
                formData.actionUrl.trim(),

            image:
                formData.image.trim(),

            expiresAt:
                formData.expiresAt || null,
        };


        // ------------------------------------------
        // CREATE
        // ------------------------------------------

        createNotification(
            payload,
            {
                onSuccess: () => {

                    handleReset();

                },
            }
        );

    };


    // ==========================================
    // RESET
    // ==========================================

    const handleReset = () => {

        setFormData({
            user: "",
            title: "",
            message: "",
            type: "announcement",
            priority: "normal",
            actionUrl: "",
            image: "",
            expiresAt: "",
        });

    };


    return (

        <div className="admin-notification-page">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="admin-notification-header">

                <div className="admin-notification-heading">

                    <div className="admin-notification-heading-icon">

                        <BellPlus size={23} />

                    </div>


                    <div>

                        <h2>
                            Create Notification
                        </h2>

                        <p>
                            Send an update or announcement
                            to your students.
                        </p>

                    </div>

                </div>

            </div>


            {/* ======================================
                FORM
            ====================================== */}

            <form
                className="admin-notification-form"
                onSubmit={handleSubmit}
            >


                <div className="admin-notification-form-header">

                    <div>

                        <h3>
                            Notification Details
                        </h3>

                        <p>
                            Choose the recipient and write
                            your notification.
                        </p>

                    </div>

                </div>


                <div className="admin-notification-grid">


                    {/* ==================================
                        STUDENT
                    ================================== */}

                    <div className="admin-notification-field">

                        <label>
                            Select Student
                        </label>


                        <div className="admin-input-wrapper">

                            <Users size={17} />


                            <select
                                name="user"
                                value={formData.user}
                                onChange={handleChange}
                                disabled={
                                    studentsLoading ||
                                    isPending
                                }
                            >

                                <option value="">

                                    {studentsLoading
                                        ? "Loading students..."
                                        : studentsError
                                            ? "Failed to load students"
                                            : "Select Student"
                                    }

                                </option>


                                {!studentsLoading &&
                                    !studentsError && (

                                        <option value="all">
                                            All Students
                                        </option>

                                    )
                                }


                                {!studentsLoading &&
                                    !studentsError &&
                                    students.map((student) => (

                                        <option
                                            key={student._id}
                                            value={student._id}
                                        >

                                            {student.name ||
                                                "Unknown Student"}

                                            {" — "}

                                            {student.email ||
                                                "No Email"}

                                        </option>

                                    ))
                                }

                            </select>

                        </div>


                        {studentsError && (

                            <span className="admin-field-error">
                                Unable to load students.
                            </span>

                        )}

                    </div>


                    {/* ==================================
                        TITLE
                    ================================== */}

                    <div className="admin-notification-field">

                        <label>
                            Notification Title
                        </label>


                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. New Python Course Available"
                            maxLength={100}
                            disabled={isPending}
                        />

                    </div>


                    {/* ==================================
                        TYPE
                    ================================== */}

                    <div className="admin-notification-field">

                        <label>
                            Notification Type
                        </label>


                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            disabled={isPending}
                        >

                            <option value="course">
                                Course
                            </option>

                            <option value="lesson">
                                Lesson
                            </option>

                            <option value="practice">
                                Practice
                            </option>

                            <option value="test">
                                Test
                            </option>

                            <option value="result">
                                Result
                            </option>

                            <option value="certificate">
                                Certificate
                            </option>

                            <option value="attendance">
                                Attendance
                            </option>

                            <option value="live-class">
                                Live Class
                            </option>

                            <option value="announcement">
                                Announcement
                            </option>

                            <option value="offer">
                                Offer
                            </option>

                            <option value="xp">
                                XP
                            </option>

                            <option value="streak">
                                Streak
                            </option>

                        </select>

                    </div>


                    {/* ==================================
                        PRIORITY
                    ================================== */}

                    <div className="admin-notification-field">

                        <label>
                            Priority
                        </label>


                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            disabled={isPending}
                        >

                            <option value="low">
                                Low
                            </option>

                            <option value="normal">
                                Normal
                            </option>

                            <option value="high">
                                High
                            </option>

                        </select>

                    </div>


                    {/* ==================================
                        MESSAGE
                    ================================== */}

                    <div className="admin-notification-field full-width">

                        <label>
                            Message
                        </label>


                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your notification message..."
                            rows={5}
                            maxLength={500}
                            disabled={isPending}
                        />


                        <span className="admin-field-hint">
                            {formData.message.length}/500
                            {" "}characters
                        </span>

                    </div>


                    {/* ==================================
                        ACTION URL
                    ================================== */}

                    <div className="admin-notification-field">

                        <label>
                            Action URL
                        </label>


                        <input
                            type="text"
                            name="actionUrl"
                            value={formData.actionUrl}
                            onChange={handleChange}
                            placeholder="/course/python"
                            disabled={isPending}
                        />

                    </div>


                    {/* ==================================
                        IMAGE
                    ================================== */}

                    <div className="admin-notification-field">

                        <label>
                            Image URL
                        </label>


                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://..."
                            disabled={isPending}
                        />

                    </div>


                    {/* ==================================
                        EXPIRY
                    ================================== */}

                    <div className="admin-notification-field">

                        <label>
                            Expiry Date
                        </label>


                        <input
                            type="datetime-local"
                            name="expiresAt"
                            value={formData.expiresAt}
                            onChange={handleChange}
                            min={
                                new Date()
                                    .toISOString()
                                    .slice(0, 16)
                            }
                            disabled={isPending}
                        />

                    </div>

                </div>


                {/* ======================================
                    INFO
                ====================================== */}

                <div className="admin-notification-info">

                    <AlertCircle size={17} />

                    <span>

                        {formData.user === "all"
                            ? "This notification will be sent to all registered students."
                            : "Select a student to send this notification only to that student."
                        }

                    </span>

                </div>


                {/* ======================================
                    ACTIONS
                ====================================== */}

                <div className="admin-notification-actions">


                    <button
                        type="button"
                        className="admin-notification-reset"
                        onClick={handleReset}
                        disabled={isPending}
                    >

                        <X size={17} />

                        Clear

                    </button>


                    <button
                        type="submit"
                        className="admin-notification-send"
                        disabled={
                            isPending ||
                            studentsLoading ||
                            !formData.user ||
                            !formData.title.trim() ||
                            !formData.message.trim()
                        }
                    >

                        {isPending ? (

                            <>

                                <span className="admin-send-spinner"></span>

                                Sending...

                            </>

                        ) : (

                            <>

                                <Send size={17} />

                                {formData.user === "all"
                                    ? "Send to All Students"
                                    : "Send Notification"
                                }

                            </>

                        )}

                    </button>

                </div>


            </form>

        </div>
    );
};


export default AdminNotification;