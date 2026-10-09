import React, { useMemo, useState } from "react";
import {
    Plus,
    Search,
    Video,
    Clock,
    CheckCircle,
    CirclePlay,
    Pencil,
    Trash2,
    X,
    BookOpen,
    RefreshCw,
    Layers,
    ExternalLink,
} from "lucide-react";

import "../../styles/AdminPanel/LessonManageSection.scss";

import {
    useAdminLessons,
    useCreateLesson,
    useUpdateLesson,
    useDeleteLesson,
    useAdminCourseOptions
} from "../../Hooks/Admin/Lesson/useAdminLessons";

// initial form 

const initialForm = {
    course: "",
    section: "",
    title: "",
    description: "",
    order: 1,
    type: "video",
    status: "Coming Soon",
    videoId: "",
    duration: 0,
    thumbnail: "",
    isPreview: false,
    isPublished: true,
    resources: [],
};

const LessonManageSection = () => {

    const [selectedCourse, setSelectedCourse] = useState("");
    const [search, setSearch] = useState("");
    const [sectionFilter, setSectionFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [form, setForm] = useState(initialForm);

    // Fetch courses with sections
    const {
        data: courseData,
        isLoading: isCoursesLoading,
        isError: isCoursesError,
        error: courseError,
        refetch: refetchCourses,
    } = useAdminCourseOptions();

    const courses = courseData?.courses || [];

    // Selected course details
    const selectedCourseData = courses.find(
        (course) => String(course._id) === String(selectedCourse)
    );

    // Selected course sections
    const sectionOptions = selectedCourseData?.sections || [];

    // Fetch lessons only after course selection
    const queryParams = useMemo(() => {
        if (!selectedCourse) {
            return null;
        }

        const params = {
            courseId: selectedCourse,
        };

        if (sectionFilter !== "all") {
            params.sectionId = sectionFilter;
        }

        return params;
    }, [selectedCourse, sectionFilter]);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useAdminLessons(queryParams);

    const { mutate: createLesson, isPending: isCreating } =
        useCreateLesson();

    const { mutate: updateLesson, isPending: isUpdating } =
        useUpdateLesson();

    const { mutate: deleteLesson, isPending: isDeleting } =
        useDeleteLesson();

    const lessons = data?.lessons || [];

    console.log(data)

    const filteredLessons = useMemo(() => {
        return lessons.filter((lesson) => {
            const searchText = search.trim().toLowerCase();

            const matchesSearch =
                lesson.title?.toLowerCase().includes(searchText) ||
                lesson.description?.toLowerCase().includes(searchText);

            const matchesStatus =
                statusFilter === "all" ||
                lesson.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [lessons, search, statusFilter]);


    const availableCount = lessons.filter(
        (lesson) => lesson.status === "Available"
    ).length;

    const comingSoonCount = lessons.filter(
        (lesson) => lesson.status === "Coming Soon"
    ).length;

    const formatDuration = (seconds = 0) => {
        const value = Number(seconds) || 0;

        if (value <= 0) return "Not set";

        const minutes = Math.floor(value / 60);
        const remainingSeconds = value % 60;

        return remainingSeconds
            ? `${minutes}m ${remainingSeconds}s`
            : `${minutes} min`;
    };

    const getSectionTitle = (section) => {
        if (typeof section === "object" && section?.title) {
            return section.title;
        }

        return (
            sectionOptions.find(
                (item) => String(item._id) === String(section)
            )?.title || "Unknown Section"
        );
    };

    const openCreateModal = () => {
        if (!selectedCourse) {
            toast.error("Please select a course first.");
            return;
        }

        setEditingLesson(null);

        setForm({
            ...initialForm,
            course: selectedCourse,
            section: sectionFilter !== "all" ? sectionFilter : "",
            order: lessons.length + 1,
        });

        setIsModalOpen(true);
    };

    // helper function jo id niklta h course mein se db ka 

    const getSectionId = (value) => {
        if (!value) return "";

        if (typeof value === "object") {
            return value._id || "";
        }

        return value;
    };

    const openEditModal = (lesson) => {
    setEditingLesson(lesson);

    setForm({
        course: getSectionId(lesson.course) || selectedCourse,
        section: getSectionId(lesson.section),
        title: lesson.title || "",
        description: lesson.description || "",
        order: lesson.order || 1,
        type: lesson.type || "video",
        status: lesson.status || "Coming Soon",
        videoId: lesson.videoId || "",
        duration: lesson.duration || 0,
        thumbnail: lesson.thumbnail || "",
        isPreview: lesson.isPreview ?? false,
        isPublished: lesson.isPublished ?? true,
        resources: lesson.resources || [],
    });

    setIsModalOpen(true);
};

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingLesson(null);
        setForm(initialForm);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.section) {
            window.alert("Please select a section.");
            return;
        }

        if (!form.title.trim()) {
            window.alert("Please enter a lesson title.");
            return;
        }

        if (
            form.status === "Available" &&
            !form.videoId.trim()
        ) {
            window.alert(
                "Please add a Video ID before making this lesson available."
            );
            return;
        }

        // payload here

        const payload = {
            ...form,
            course: editingLesson
                ? getSectionId(editingLesson.course) || selectedCourse
                : selectedCourse,
            section: form.section,
            title: form.title.trim(),
            order: Number(form.order),
            duration: Number(form.duration) || 0,
            videoId: form.videoId.trim(),
        };

        if (editingLesson) {
            updateLesson(
                {
                    lessonId: editingLesson._id,
                    data: payload,
                },
                {
                    onSuccess: () => closeModal(),
                }
            );
        } else {
            createLesson(payload, {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (lesson) => {
        const confirmed = window.confirm(
            `Delete "${lesson.title}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        deleteLesson(lesson._id);
    };

    const handleQuickPublish = (lesson) => {
        if (lesson.status === "Available") return;

        if (!lesson.videoId?.trim()) {
            window.alert(
                "Add the video ID first. Then you can make this lesson available."
            );
            openEditModal(lesson);
            return;
        }

        updateLesson({
            lessonId: lesson._id,
            data: {
                status: "Available",
            },
        });
    };

    if (isLoading) {
        return (
            <div className="lesson-admin-state">
                <div className="lesson-admin-spinner" />
                <h3>Loading Lessons</h3>
                <p>Fetching lessons from SHRA Technology.</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="lesson-admin-state">
                <h3>Unable to Load Lessons</h3>
                <p>
                    {error?.response?.data?.message ||
                        "Something went wrong while fetching lessons."}
                </p>

                <button type="button" onClick={() => refetch()}>
                    <RefreshCw size={16} />
                    Try Again
                </button>
            </div>
        );
    }

    return (

        <>
            <section className="lesson-admin-page">
                {/* Header */}
                <div className="lesson-admin-header">
                    <div>
                        <span className="lesson-admin-eyebrow">
                            COURSE MANAGEMENT
                        </span>

                        <h1>Lesson Management</h1>

                        <p>
                            Create lessons, manage videos and control lesson
                            availability.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="lesson-primary-btn"
                        onClick={openCreateModal}
                    >
                        <Plus size={18} />
                        Create Lesson
                    </button>
                </div>

                {/* COURSE SELECTOR */}
                <div className="lesson-course-selector">
                    <div className="lesson-course-selector-info">
                        <BookOpen size={22} />

                        <div>
                            <h3>Select Course</h3>
                            <p>
                                Choose a course to manage its lessons.
                            </p>
                        </div>
                    </div>

                    <select
                        value={selectedCourse}
                        onChange={(event) => {
                            setSelectedCourse(event.target.value);
                            setSectionFilter("all");
                            setSearch("");
                            setStatusFilter("all");
                        }}
                        disabled={isCoursesLoading || isCoursesError}
                    >
                        <option value="">
                            {isCoursesLoading
                                ? "Loading courses..."
                                : "Select a Course"}
                        </option>

                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>

                    {isCoursesError && (
                        <div>
                            <p>
                                {courseError?.response?.data?.message ||
                                    "Unable to load courses."}
                            </p>

                            <button
                                type="button"
                                onClick={() => refetchCourses()}
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>

                {/* Statistics */}
                <div className="lesson-stats-grid">
                    <div className="lesson-stat-card">
                        <div className="lesson-stat-icon total">
                            <BookOpen size={21} />
                        </div>

                        <div>
                            <span>Total Lessons</span>
                            <h3>{lessons.length}</h3>
                        </div>
                    </div>

                    <div className="lesson-stat-card">
                        <div className="lesson-stat-icon available">
                            <CheckCircle size={21} />
                        </div>

                        <div>
                            <span>Available</span>
                            <h3>{availableCount}</h3>
                        </div>
                    </div>

                    <div className="lesson-stat-card">
                        <div className="lesson-stat-icon upcoming">
                            <Clock size={21} />
                        </div>

                        <div>
                            <span>Coming Soon</span>
                            <h3>{comingSoonCount}</h3>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="lesson-toolbar">

                    <div className="lesson-search">
                        <Search size={18} />

                        <input
                            type="search"
                            placeholder="Search lessons..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>

                    {/* section filter here */}
                    <select
                        value={sectionFilter}
                        onChange={(event) => setSectionFilter(event.target.value)}
                        aria-label="Filter by section"
                        disabled={!selectedCourse || isCoursesLoading}
                    >
                        <option value="all">All Sections</option>

                        {sectionOptions.map((section) => (
                            <option key={section._id} value={section._id}>
                                {section.title}
                            </option>
                        ))}
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        aria-label="Filter by status"
                    >
                        <option value="all">All Statuses</option>
                        <option value="Available">Available</option>
                        <option value="Coming Soon">Coming Soon</option>
                    </select>

                    <button
                        type="button"
                        className="lesson-refresh-btn"
                        onClick={() => refetch()}
                        title="Refresh lessons"
                        disabled={isFetching}
                    >
                        <RefreshCw
                            size={17}
                            className={isFetching ? "refreshing" : ""}
                        />
                    </button>
                </div>

                {/* Lesson List */}
                <div className="lesson-admin-list">
                    <div className="lesson-list-heading">
                        <div>
                            <h2>Course Lessons</h2>
                            <p>
                                {filteredLessons.length} lesson
                                {filteredLessons.length !== 1 ? "s" : ""} found
                            </p>
                        </div>
                    </div>


                    {!selectedCourse ? (
                        <div className="lesson-empty-state">
                            <BookOpen size={38} />

                            <h3>Select a Course</h3>

                            <p>
                                Select a course above to view and manage its lessons.
                            </p>
                        </div>
                    ) : isLoading ? (
                        <div className="lesson-admin-state">
                            <div className="lesson-admin-spinner" />
                            <h3>Loading Lessons</h3>
                            <p>Fetching lessons for the selected course...</p>
                        </div>
                    ) : isError ? (
                        <div className="lesson-admin-state">
                            <h3>Unable to Load Lessons</h3>

                            <p>
                                {error?.response?.data?.message ||
                                    "Something went wrong while fetching lessons."}
                            </p>

                            <button type="button" onClick={() => refetch()}>
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                        </div>
                    ) : filteredLessons.length === 0 ? (
                        <div className="lesson-empty-state">
                            <Layers size={38} />

                            <h3>No Lessons Found</h3>

                            <p>
                                This course has no matching lessons. Create a lesson to get started.
                            </p>

                            <button
                                type="button"
                                className="lesson-primary-btn"
                                onClick={openCreateModal}
                            >
                                <Plus size={17} />
                                Create Lesson
                            </button>
                        </div>
                    ) : (
                        // Yahan tumhara existing lesson table rakho

                        <div className="lesson-table-wrapper">

                            {/* Existing table JSX */}

                            <table className="lesson-table">
                                <thead>
                                    <tr>
                                        <th>Lesson</th>
                                        <th>Section</th>
                                        <th>Duration</th>
                                        <th>Status</th>
                                        <th>Video</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredLessons.map((lesson) => (
                                        <tr key={lesson._id}>
                                            <td>
                                                <div className="lesson-table-title">
                                                    <span className="lesson-order">
                                                        {String(lesson.order).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>

                                                    <div>
                                                        <strong>
                                                            {lesson.title}
                                                        </strong>

                                                        <span>
                                                            {lesson.type}
                                                            {lesson.isPreview
                                                                ? " · Preview"
                                                                : ""}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="lesson-section-name">
                                                    {getSectionTitle(lesson.section)}
                                                </span>
                                            </td>

                                            <td>
                                                {formatDuration(lesson.duration)}
                                            </td>

                                            <td>
                                                <span
                                                    className={`lesson-status-pill ${lesson.status === "Available"
                                                        ? "available"
                                                        : "coming-soon"
                                                        }`}
                                                >
                                                    {lesson.status === "Available" ? (
                                                        <CheckCircle size={14} />
                                                    ) : (
                                                        <Clock size={14} />
                                                    )}

                                                    {lesson.status}
                                                </span>
                                            </td>

                                            <td>
                                                {lesson.videoId ? (
                                                    <span className="lesson-video-added">
                                                        <Video size={15} />
                                                        Added
                                                    </span>
                                                ) : (
                                                    <span className="lesson-video-missing">
                                                        Not added
                                                    </span>
                                                )}
                                            </td>

                                            <td>
                                                <div className="lesson-row-actions">
                                                    <button
                                                        type="button"
                                                        className="lesson-action-btn edit"
                                                        title="Edit lesson"
                                                        onClick={() => {

                                                            console.log("clicked")

                                                            openEditModal(lesson);
                                                            setIsModalOpen(true);
                                                        }
                                                        }
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    {lesson.status !== "Available" &&
                                                        lesson.videoId && (
                                                            <button
                                                                type="button"
                                                                className="lesson-action-btn publish"
                                                                title="Make available"
                                                                onClick={() =>
                                                                    handleQuickPublish(
                                                                        lesson
                                                                    )
                                                                }
                                                            >
                                                                <CirclePlay size={17} />
                                                            </button>
                                                        )}

                                                    {lesson.videoId && (
                                                        <a
                                                            className="lesson-action-btn preview-video"
                                                            href={
                                                                lesson.videoId.startsWith(
                                                                    "http"
                                                                )
                                                                    ? lesson.videoId
                                                                    : undefined
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title="Open video URL"
                                                            onClick={(event) => {
                                                                if (
                                                                    !lesson.videoId.startsWith(
                                                                        "http"
                                                                    )
                                                                ) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            <ExternalLink size={16} />
                                                        </a>
                                                    )}

                                                    <button
                                                        type="button"
                                                        className="lesson-action-btn delete"
                                                        title="Delete lesson"
                                                        onClick={() =>
                                                            handleDelete(lesson)
                                                        }
                                                        disabled={isDeleting}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </section>

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div
                    className="lesson-modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="lesson-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="lesson-modal-header">
                            <div>
                                <span>COURSE CONTENT</span>

                                <h2>
                                    {editingLesson ? "Edit Lesson" : "Create Lesson"}
                                </h2>

                                <p>
                                    Manage lesson details and video availability.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="lesson-modal-close"
                                onClick={closeModal}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Lesson Form */}
                        <form
                            className="lesson-modal-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="lesson-form-grid">

                                {/* Lesson Title */}
                                <label className="lesson-form-field full">
                                    <span>Lesson Title *</span>

                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Introduction to C"
                                        required
                                    />
                                </label>

                                {/* Description */}
                                <label className="lesson-form-field full">
                                    <span>Description</span>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="What will students learn?"
                                        rows={3}
                                    />
                                </label>

                                {/* Course */}
                                <label className="lesson-form-field full">
                                    <span>Course *</span>

                                    <select
                                        name="course"
                                        value={form.course}
                                        onChange={(event) => {
                                            const courseId = event.target.value;

                                            setForm((previous) => ({
                                                ...previous,
                                                course: courseId,
                                                section: "",
                                            }));
                                        }}
                                        required
                                        disabled={Boolean(editingLesson)}
                                    >
                                        <option value="">Select Course</option>

                                        {courses.map((course) => (
                                            <option
                                                key={course._id}
                                                value={course._id}
                                            >
                                                {course.title}
                                            </option>
                                        ))}
                                    </select>

                                    {editingLesson && (
                                        <small>
                                            Course cannot be changed while editing.
                                        </small>
                                    )}
                                </label>

                                {/* Section */}
                                <label className="lesson-form-field">
                                    <span>Section *</span>

                                    <select
                                        name="section"
                                        value={form.section}
                                        onChange={handleChange}
                                        required
                                        disabled={!form.course}
                                    >
                                        <option value="">
                                            Select Section
                                        </option>

                                        {(
                                            String(form.course) === String(selectedCourse)
                                                ? sectionOptions
                                                : courses.find(
                                                    (course) =>
                                                        String(course._id) ===
                                                        String(form.course)
                                                )?.sections || []
                                        ).map((section) => (
                                            <option
                                                key={section._id}
                                                value={section._id}
                                            >
                                                {section.title}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                {/* Lesson Order */}
                                <label className="lesson-form-field">
                                    <span>Lesson Order *</span>

                                    <input
                                        type="number"
                                        name="order"
                                        min="1"
                                        value={form.order}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                {/* Lesson Type */}
                                <label className="lesson-form-field">
                                    <span>Lesson Type</span>

                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                    >
                                        <option value="video">Video</option>
                                        <option value="practice">Practice</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="assignment">Assignment</option>
                                    </select>
                                </label>

                                {/* Status */}
                                <label className="lesson-form-field">
                                    <span>Status</span>

                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Coming Soon">Coming Soon</option>
                                        <option value="Available">Available</option>
                                    </select>
                                </label>

                                {/* Video ID */}
                                <label className="lesson-form-field full">
                                    <span>Video ID / Video URL</span>

                                    <input
                                        name="videoId"
                                        value={form.videoId}
                                        onChange={handleChange}
                                        placeholder="Enter your video ID or URL"
                                    />

                                    <small>
                                        Enter the format expected by your existing video player.
                                    </small>
                                </label>

                                {/* Duration */}
                                <label className="lesson-form-field">
                                    <span>Duration (seconds)</span>

                                    <input
                                        type="number"
                                        name="duration"
                                        min="0"
                                        value={form.duration}
                                        onChange={handleChange}
                                    />
                                </label>

                                {/* Thumbnail */}
                                <label className="lesson-form-field">
                                    <span>Thumbnail URL</span>

                                    <input
                                        name="thumbnail"
                                        value={form.thumbnail}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                    />
                                </label>

                                {/* Preview */}
                                <label className="lesson-form-checkbox">
                                    <input
                                        type="checkbox"
                                        name="isPreview"
                                        checked={form.isPreview}
                                        onChange={handleChange}
                                    />

                                    <span>Allow preview without enrollment</span>
                                </label>

                                {/* Published */}
                                <label className="lesson-form-checkbox">
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={form.isPublished}
                                        onChange={handleChange}
                                    />

                                    <span>Publish lesson in course</span>
                                </label>
                            </div>

                            {/* Warning */}
                            {form.status === "Available" &&
                                !form.videoId.trim() && (
                                    <div className="lesson-form-warning">
                                        Add a video ID before making this lesson available.
                                    </div>
                                )}

                            {/* Footer */}
                            <div className="lesson-modal-footer">
                                <button
                                    type="button"
                                    className="lesson-cancel-btn"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="lesson-primary-btn"
                                    disabled={isCreating || isUpdating}
                                >
                                    {isCreating || isUpdating
                                        ? "Saving..."
                                        : editingLesson
                                            ? "Save Changes"
                                            : "Create Lesson"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
};

export default LessonManageSection;