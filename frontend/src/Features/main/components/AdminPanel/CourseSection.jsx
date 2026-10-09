import React, { useState } from "react";
import {
    Plus,
    SquarePen,
    Trash2,
} from "lucide-react";

import "../../styles/AdminPanel/CourseManage.scss";

import { useCreateCourse } from "../../Hooks/Course/useCourse";

import {
    useAdminCourses,
    useDeleteCourseAdmin,
    useUpdateCourseAdmin

} from "../../Hooks/Admin/Course/useAdminCourses";


const CourseSection = () => {

    // ==========================================
    // CREATE COURSE STATES
    // ==========================================

    const [courseTitle, setCourseTitle] = useState("");
    const [courseSubTitle, setCourseSubTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [language, setLanguage] = useState("");
    const [pricing, setPricing] = useState("");
    const [tags, setTags] = useState("");


    const [editingCourse, setEditingCourse] = useState(null);

    const [editTitle, setEditTitle] = useState("");
    const [editSubtitle, setEditSubtitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editTags, setEditTags] = useState("");
    const [editLevel, setEditLevel] = useState("");
    const [editLanguage, setEditLanguage] = useState("");
    const [editPricing, setEditPricing] = useState("");
    const [editStatus, setEditStatus] = useState("");


    // ==========================================
    // CREATE COURSE HOOK
    // ==========================================

    const {
        mutateAsync: createCourseHandler,
        isPending: createLoading,
        error: createError,
    } = useCreateCourse();


    // ==========================================
    // GET ADMIN COURSES
    // ==========================================

    const {
        data: coursesData,
        isLoading: coursesLoading,
        isError: coursesError,
        error: coursesErrorData,
    } = useAdminCourses();


    const courses = coursesData?.courses || [];


    //==========================================
    // UPDATE COURSE
    //==========================================

    const { mutate: updateCourse, isPending: isUpdating } =
        useUpdateCourseAdmin();

    // ==========================================
    // DELETE COURSE
    // ==========================================

    const {
        mutate: deleteCourse,
        isPending: deleteLoading,
    } = useDeleteCourseAdmin();


    // ==========================================
    // CREATE COURSE
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", courseTitle);
        formData.append("subtitle", courseSubTitle);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("language", language);
        formData.append("level", level);
        formData.append("price", pricing);
        formData.append("tags", tags);
        formData.append("thumbnail", thumbnail);

        try {

            const result =
                await createCourseHandler(formData);

            console.log(
                "Course created successfully:",
                result
            );

            // Reset form

            setCourseTitle("");
            setCourseSubTitle("");
            setDescription("");
            setThumbnail(null);
            setCategory("");
            setLevel("");
            setLanguage("");
            setPricing("");
            setTags("");

            e.target.reset();

        } catch (error) {

            console.log(
                "Create course failed:",
                error
            );
        }
    };

    //==========================================
    // EDIT COURSE HANDLER
    //==========================================


    const handleEditCourse = (course) => {
        setEditingCourse(course);

        setEditTitle(course.title || "");
        setEditSubtitle(course.subtitle || "");
        setEditDescription(course.description || "");
        setEditCategory(course.category || "");
        setEditTags(
            Array.isArray(course.tags)
                ? course.tags.join(", ")
                : course.tags || ""
        );
        setEditLevel(course.level || "");
        setEditLanguage(course.language || "");

        setEditPricing(
            course.pricing?.price ??
            course.price ??
            ""
        );

        setEditStatus(course.status || "Draft");
    };

    // =========================================
    // UPDATE COURSE HANDLER
    // =========================================

    const handleUpdateCourse = () => {
        if (!editingCourse?._id) return;

        const updateData = {
            title: editTitle.trim(),
            subtitle: editSubtitle.trim(),
            description: editDescription.trim(),
            category: editCategory,
            level: editLevel,
            language: editLanguage,
            price: Number(editPricing),
            tags: editTags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            status: editStatus,
        };

        updateCourse(
            {
                courseId: editingCourse._id,
                data: updateData,
            },
            {
                onSuccess: () => {
                    setEditingCourse(null);
                },
            }
        );
    };

    // ==========================================
    // DELETE HANDLER
    // ==========================================

    const handleDeleteCourse = (courseId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) {
            return;
        }

        deleteCourse(courseId);
    };


    // ==========================================
    // LOADING COURSES
    // ==========================================

    if (coursesLoading) {
        return (
            <div className="course-section-loading">
                <p>Loading courses...</p>
            </div>
        );
    }


    // ==========================================
    // COURSES ERROR
    // ==========================================

    if (coursesError) {
        return (
            <div className="course-section-error">
                <p>
                    {coursesErrorData?.response?.data?.message ||
                        coursesErrorData?.message ||
                        "Failed to load courses"}
                </p>
            </div>
        );
    }


    return (
        <>

            {/* ==========================================
                ADD COURSE
            ========================================== */}

            <div className="course-manage-container">

                <div className="header-section">
                    <h3>Add New Course</h3>

                    <p>
                        Create a new course for students.
                    </p>
                </div>


                <div className="course-form">

                    <form
                        className="auth-form admin-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Course Title */}

                        <div className="form-group">

                            <label>
                                Course Title
                            </label>

                            <input
                                type="text"
                                placeholder="e.g., Advance JavaScript"
                                value={courseTitle}
                                onChange={(e) =>
                                    setCourseTitle(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* Course Subtitle */}

                        <div className="form-group">

                            <label>
                                Course SubTitle
                            </label>

                            <input
                                type="text"
                                placeholder="e.g., learn from scratch"
                                value={courseSubTitle}
                                onChange={(e) =>
                                    setCourseSubTitle(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* Description */}

                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                placeholder="Course description....."
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* Small Details */}

                        <div className="course-other-title">

                            {/* Category */}

                            <div className="form-group">

                                <label>
                                    Category
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g., web development"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* Tags */}

                            <div className="form-group">

                                <label>
                                    Tags
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g., MERN"
                                    value={tags}
                                    onChange={(e) =>
                                        setTags(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* Level */}

                            <div className="form-group">

                                <label>
                                    Level
                                </label>

                                <select
                                    value={level}
                                    onChange={(e) =>
                                        setLevel(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Level
                                    </option>

                                    <option value="Beginner">
                                        Beginner
                                    </option>

                                    <option value="Intermediate">
                                        Intermediate
                                    </option>

                                    <option value="Advanced">
                                        Advanced
                                    </option>

                                </select>

                            </div>


                            {/* Language */}

                            <div className="form-group">

                                <label>
                                    Language
                                </label>

                                <select
                                    value={language}
                                    onChange={(e) =>
                                        setLanguage(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Language
                                    </option>

                                    <option value="Hindi">
                                        Hindi
                                    </option>

                                    <option value="English">
                                        English
                                    </option>

                                    <option value="Hinglish">
                                        Hinglish
                                    </option>

                                </select>

                            </div>


                            {/* Course Banner */}

                            <div className="form-group">

                                <label>
                                    Course Banner
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setThumbnail(
                                            e.target.files[0]
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* Pricing */}

                            <div className="form-group">

                                <label>
                                    Pricing
                                </label>

                                <input
                                    type="number"
                                    placeholder="e.g., 499"
                                    value={pricing}
                                    onChange={(e) =>
                                        setPricing(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* Error */}

                        {createError && (
                            <p className="form-error">
                                {createError?.response?.data?.message ||
                                    createError?.message ||
                                    "Failed to create course"}
                            </p>
                        )}


                        {/* Submit */}

                        <button
                            type="submit"
                            className="courseAdd-btn"
                            disabled={createLoading}
                        >

                            <Plus />

                            {createLoading
                                ? "Creating Course..."
                                : "Add Course"}

                        </button>

                    </form>

                </div>

            </div>


            {/* ==========================================
                MANAGE COURSES
            ========================================== */}

            <div className="course-manage-section">

                <div className="header-section">

                    <h3>
                        Manage Courses
                    </h3>

                    <p>
                        Edit or delete existing courses.
                    </p>

                </div>


                {/* Course List */}

                <div className="course-list-container">

                    {courses.length === 0 ? (

                        <div className="empty-courses">

                            <p>
                                No courses found.
                            </p>

                        </div>

                    ) : (

                        courses.map((course) => (

                            <div
                                className="single-course"
                                key={course._id}
                            >

                                {/* LEFT */}

                                <div className="left-part">

                                    <h4>
                                        {course.title}
                                    </h4>

                                    <p>

                                        {course.totalStudents || 0}

                                        {" students • "}

                                        <span
                                            className={
                                                course.status === "Published"
                                                    ? "status-active"
                                                    : "status-draft"
                                            }
                                        >
                                            {course.status ||
                                                "Draft"}
                                        </span>

                                    </p>

                                </div>


                                {/* RIGHT */}

                                <div className="right-part">

                                    {/* EDIT */}

                                    <button
                                        type="button"
                                        className="edit-btn"
                                        title="Edit Course"
                                        onClick={() => handleEditCourse(course)}
                                    >
                                        <SquarePen size={20} />
                                    </button>


                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        className="delete-btn"
                                        title="Delete Course"
                                        disabled={deleteLoading}
                                        onClick={() =>
                                            handleDeleteCourse(
                                                course._id
                                            )
                                        }
                                    >

                                        <Trash2
                                            size={20}
                                        />

                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>


            {/* ==========================================
    EDIT COURSE MODAL
========================================== */}

            {editingCourse && (

                <div className="edit-course-overlay">

                    <div className="edit-course-modal">

                        {/* =========================
                HEADER
            ========================= */}

                        <div className="edit-modal-header">

                            <div>
                                <h3>
                                    Edit Course
                                </h3>

                                <p>
                                    Update course information
                                </p>
                            </div>

                            <button
                                type="button"
                                className="edit-modal-close"
                                onClick={() => setEditingCourse(null)}
                            >
                                ×
                            </button>

                        </div>


                        {/* =========================
                FORM
            ========================= */}

                        <form
                            className="edit-course-form"
                            onSubmit={async (e) => {

                                e.preventDefault();

                                console.log({
                                    courseId: editingCourse._id,

                                    courseTitle: editTitle,

                                    courseSubTitle:
                                        editSubtitle,

                                    description:
                                        editDescription,

                                    category:
                                        editCategory,

                                    tags:
                                        editTags,

                                    level:
                                        editLevel,

                                    language:
                                        editLanguage,

                                    pricing:
                                        editPricing,

                                    status:
                                        editStatus,
                                });

                            }}
                        >

                            {/* =========================
                    TITLE
                ========================= */}

                            <div className="form-group">

                                <label>
                                    Course Title
                                </label>

                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Course title"
                                    required
                                />

                            </div>


                            {/* =========================
                    SUBTITLE
                ========================= */}

                            <div className="form-group">

                                <label>
                                    Course Subtitle
                                </label>

                                <input
                                    type="text"
                                    value={editSubtitle}
                                    onChange={(e) =>
                                        setEditSubtitle(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Course subtitle"
                                    required
                                />

                            </div>


                            {/* =========================
                    DESCRIPTION
                ========================= */}

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    value={editDescription}
                                    onChange={(e) =>
                                        setEditDescription(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Course description"
                                    rows={5}
                                    required
                                />

                            </div>


                            {/* =========================
                    TWO COLUMN
                ========================= */}

                            <div className="edit-form-grid">

                                {/* CATEGORY */}

                                <div className="form-group">

                                    <label>
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        value={editCategory}
                                        onChange={(e) =>
                                            setEditCategory(
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Web Development"
                                        required
                                    />

                                </div>


                                {/* TAGS */}

                                <div className="form-group">

                                    <label>
                                        Tags
                                    </label>

                                    <input
                                        type="text"
                                        value={editTags}
                                        onChange={(e) =>
                                            setEditTags(
                                                e.target.value
                                            )
                                        }
                                        placeholder="React, JavaScript, MERN"
                                    />

                                </div>


                                {/* LEVEL */}

                                <div className="form-group">

                                    <label>
                                        Level
                                    </label>

                                    <select
                                        value={editLevel}
                                        onChange={(e) =>
                                            setEditLevel(
                                                e.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Level
                                        </option>

                                        <option value="Beginner">
                                            Beginner
                                        </option>

                                        <option value="Intermediate">
                                            Intermediate
                                        </option>

                                        <option value="Advanced">
                                            Advanced
                                        </option>

                                    </select>

                                </div>


                                {/* LANGUAGE */}

                                <div className="form-group">

                                    <label>
                                        Language
                                    </label>

                                    <select
                                        value={editLanguage}
                                        onChange={(e) =>
                                            setEditLanguage(
                                                e.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Language
                                        </option>

                                        <option value="Hindi">
                                            Hindi
                                        </option>

                                        <option value="English">
                                            English
                                        </option>

                                        <option value="Hinglish">
                                            Hinglish
                                        </option>

                                    </select>

                                </div>


                                {/* PRICE */}

                                <div className="form-group">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        value={editPricing}
                                        onChange={(e) =>
                                            setEditPricing(
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. 499"
                                        min="0"
                                        required
                                    />

                                </div>


                                {/* STATUS */}

                                <div className="form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        value={editStatus}
                                        onChange={(e) =>
                                            setEditStatus(
                                                e.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="Draft">
                                            Draft
                                        </option>

                                        <option value="Published">
                                            Published
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* =========================
                    CURRENT THUMBNAIL
                ========================= */}

                            {editingCourse.thumbnail && (

                                <div className="current-thumbnail">

                                    <label>
                                        Current Thumbnail
                                    </label>

                                    <img
                                        src={
                                            editingCourse.thumbnail
                                        }
                                        alt={
                                            editingCourse.title
                                        }
                                    />

                                </div>

                            )}


                            {/* =========================
                    ACTIONS
                ========================= */}

                            <div className="edit-modal-actions">

                                <button
                                    type="button"
                                    className="cancel-edit-btn"
                                    onClick={() => setEditingCourse(null)}
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    className="save-edit-btn"
                                    onClick={handleUpdateCourse}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </>
    );
};

export default CourseSection;