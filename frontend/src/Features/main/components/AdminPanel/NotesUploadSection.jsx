import React, { useState } from "react";
import "../../styles/AdminPanel/NotesUpload.scss";
import { Upload } from "lucide-react";

import {
    useNotesCourses,
    useNotesSections,
    useCreateNote,
} from "../../Hooks/Admin/Notes/useNotes";


const NotesUploadSection = ({ noteInputRef }) => {

    const [notesTitle, setNotesTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const [course, setCourse] = useState("");
    const [section, setSection] = useState("");

    const [difficulty, setDifficulty] = useState("Beginner");
    const [language, setLanguage] = useState("English");

    const [fileUrl, setFileUrl] = useState("");


    // ==========================================
    // GET COURSES
    // ==========================================

    const {
        data: coursesData,
        isLoading: coursesLoading,
        isError: coursesError,
    } = useNotesCourses();


    // ==========================================
    // GET SECTIONS
    // ==========================================

    const {
        data: sectionsData,
        isLoading: sectionsLoading,
    } = useNotesSections(course);


    // ==========================================
    // CREATE NOTE
    // ==========================================

    const {
        mutate: createNote,
        isPending: isUploading,
    } = useCreateNote();



    const courses = coursesData?.courses || [];
    const sections = sectionsData?.sections || [];


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!course) {
            alert("Please select a course.");
            return;
        }

        if (!fileUrl.trim()) {
            alert("Please enter Google Drive PDF URL.");
            return;
        }

        const data = {
            title: notesTitle.trim(),
            subject: subject.trim(),
            description: description.trim(),
            course,
            section: section || null,
            difficulty,
            language,
            fileUrl: fileUrl.trim(),
        };

        createNote(data, {
            onSuccess: () => {

                setNotesTitle("");
                setSubject("");
                setDescription("");
                setCourse("");
                setSection("");
                setDifficulty("Beginner");
                setLanguage("English");
                setFileUrl("");
            },
        });
    };


    return (
        <div className="course-manage-container">

            {/* ================= HEADER ================= */}

            <div className="header-section">

                <h3>
                    Upload Notes
                </h3>

                <p>
                    Add study materials for students.
                </p>

            </div>


            {/* ================= FORM ================= */}

            <div className="course-form">

                <form
                    className="auth-form admin-form"
                    onSubmit={handleSubmit}
                >


                    {/* ================= COURSE ================= */}

                    <div className="form-group">

                        <label>
                            Course *
                        </label>

                        <select
                            value={course}
                            onChange={(e) => {

                                setCourse(
                                    e.target.value
                                );

                                // Course change hone par
                                // section reset
                                setSection("");
                            }}
                            required
                        >

                            <option value="">
                                {coursesLoading
                                    ? "Loading courses..."
                                    : "Select Course"
                                }
                            </option>


                            {courses.map((item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.title}
                                </option>

                            ))}

                        </select>

                        {coursesError && (
                            <small>
                                Failed to load courses
                            </small>
                        )}

                    </div>


                    {/* ================= SECTION ================= */}

                    <div className="form-group">

                        <label>
                            Section
                        </label>

                        <select
                            value={section}
                            onChange={(e) =>
                                setSection(
                                    e.target.value
                                )
                            }
                            disabled={
                                !course ||
                                sectionsLoading
                            }
                        >

                            <option value="">

                                {sectionsLoading
                                    ? "Loading sections..."
                                    : "Select Section"
                                }

                            </option>


                            {sections.map((item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.title}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* ================= TITLE ================= */}

                    <div className="form-group">

                        <label>
                            Note Title *
                        </label>

                        <input
                            type="text"
                            placeholder="e.g., React Hooks Guide"
                            value={notesTitle}
                            onChange={(e) =>
                                setNotesTitle(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* ================= SUBJECT ================= */}

                    <div className="form-group">

                        <label>
                            Subject *
                        </label>

                        <input
                            type="text"
                            placeholder="e.g., Web Development"
                            value={subject}
                            onChange={(e) =>
                                setSubject(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* ================= DESCRIPTION ================= */}

                    <div className="form-group">

                        <label>
                            Description *
                        </label>

                        <textarea
                            placeholder="Write a short description about these notes..."
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            rows={4}
                            required
                        />

                    </div>


                    {/* ================= DIFFICULTY ================= */}

                    <div className="form-group">

                        <label>
                            Difficulty *
                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(
                                    e.target.value
                                )
                            }
                            required
                        >

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


                    {/* ================= LANGUAGE ================= */}

                    <div className="form-group">

                        <label>
                            Language *
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

                            <option value="English">
                                English
                            </option>

                            <option value="Hindi">
                                Hindi
                            </option>

                            <option value="Hinglish">
                                Hinglish
                            </option>

                        </select>

                    </div>


                    {/* ================= GOOGLE DRIVE URL ================= */}

                    <div className="form-group">

                        <label>
                            Google Drive PDF URL *
                        </label>

                        <input
                            type="url"
                            placeholder="https://drive.google.com/file/d/..."
                            value={fileUrl}
                            onChange={(e) =>
                                setFileUrl(e.target.value)
                            }
                            required
                        />

                        <small className="form-hint">
                            Make sure the PDF is accessible to anyone
                            with the link.
                        </small>

                    </div>


                    {/* ================= SUBMIT ================= */}

                    <button
                        type="submit"
                        className="courseAdd-btn"
                        disabled={isUploading}
                    >

                        <Upload />

                        {isUploading
                            ? "Uploading..."
                            : "Upload Notes"
                        }

                    </button>


                </form>

            </div>

        </div>
    );
};


export default NotesUploadSection;