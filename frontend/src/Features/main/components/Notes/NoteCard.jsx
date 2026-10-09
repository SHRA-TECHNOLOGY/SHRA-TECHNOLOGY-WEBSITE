import React from "react";

import pdfIcon from "../../../../assets/pdfLogo.png";

import {
    Download,
    FileText,
    RefreshCw,
} from "lucide-react";

import { useAllNotes } from "../../Hooks/Admin/Notes/useNotes";


const NoteCard = () => {

    // ==========================================
    // GET NOTES FROM BACKEND
    // ==========================================

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useAllNotes();

    const notes = data?.notes || [];


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {

        return (

            <div className="notes-state-container">

                <div className="notes-loading-card">

                    <div className="notes-loading-icon">
                        <FileText size={24} />
                    </div>

                    <h3>
                        Loading Notes
                    </h3>

                    <p>
                        Please wait while we fetch the latest notes.
                    </p>


                    {/* Skeleton */}

                    <div className="notes-skeleton">

                        <div className="notes-skeleton-top">

                            <span className="skeleton-pdf"></span>

                            <div className="skeleton-details">

                                <span className="skeleton-title"></span>

                                <span className="skeleton-subject"></span>

                                <span className="skeleton-small"></span>

                            </div>

                        </div>


                        <span className="skeleton-description"></span>

                        <span className="skeleton-description short"></span>

                        <div className="skeleton-meta">

                            <span></span>
                            <span></span>
                            <span></span>

                        </div>

                        <span className="skeleton-button"></span>

                    </div>

                </div>

            </div>

        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (isError) {

        return (

            <div className="notes-state-container">

                <div className="notes-state-card notes-error-card">

                    <div className="notes-error-icon">
                        !
                    </div>

                    <h3>
                        Unable to Load Notes
                    </h3>

                    <p>
                        {error?.response?.data?.message ||
                            "Something went wrong while loading notes. Please try again."}
                    </p>


                    <button
                        type="button"
                        className="notes-retry-btn"
                        onClick={() => refetch()}
                    >

                        <RefreshCw size={17} />

                        Try Again

                    </button>

                </div>

            </div>

        );
    }


    // ==========================================
    // EMPTY
    // ==========================================

    if (!notes.length) {

        return (

            <div className="notes-state-container">

                <div className="notes-state-card notes-empty-card">

                    <div className="notes-empty-icon">

                        <FileText size={25} />

                    </div>

                    <h3>
                        No Notes Available
                    </h3>

                    <p>
                        Notes will appear here once they are uploaded.
                    </p>

                </div>

            </div>

        );
    }


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

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
    // GOOGLE DRIVE DOWNLOAD URL
    // ==========================================

    const getDriveDownloadUrl = (url) => {

        if (!url) {
            return "#";
        }

        const match = url.match(
            /\/file\/d\/([^/]+)/
        );

        if (!match) {
            return url;
        }

        const fileId = match[1];

        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    };


    // ==========================================
    // RENDER NOTES
    // ==========================================

    return (

        <div className="notes-grid">

            {notes.map((note) => {

                const file = note.file || {};


                return (

                    <article
                        className="note-card"
                        key={note._id}
                    >

                        {/* ==================================
                            TOP SECTION
                        ================================== */}

                        <div className="note-left">

                            <div className="note-pdf-icon">

                                <img
                                    src={pdfIcon}
                                    alt="PDF"
                                />

                            </div>


                            <div className="pdf-details">

                                <h3>
                                    {note.title}
                                </h3>

                                <p className="note-subject">
                                    {note.subject}
                                </p>

                                <span className="note-file-info">

                                    PDF

                                    <span>•</span>

                                    {file.sizeFormatted || "N/A"}

                                    <span>•</span>

                                    {file.pages || 0} Pages

                                </span>

                            </div>

                        </div>


                        {/* ==================================
                            DESCRIPTION
                        ================================== */}

                        <p className="note-description">
                            {note.description || "No description available."}
                        </p>


                        {/* ==================================
                            EXTRA INFO
                        ================================== */}

                        <div className="note-meta">

                            <span>
                                {note.difficulty || "Beginner"}
                            </span>

                            <span>
                                {note.language || "English"}
                            </span>

                            <span>
                                {note.downloads || 0} Downloads
                            </span>

                        </div>


                        {/* ==================================
                            UPLOAD DATE
                        ================================== */}

                        <div className="note-date">

                            <FileText size={15} />

                            <span>
                                Uploaded on{" "}
                                {formatDate(note.uploadedAt)}
                            </span>

                        </div>


                        {/* ==================================
                            DOWNLOAD
                        ================================== */}

                        <a
                            href={getDriveDownloadUrl(file.url)}
                            className="download-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                            <Download size={18} />

                            Download PDF

                        </a>

                    </article>

                );

            })}

        </div>

    );
};


export default NoteCard;