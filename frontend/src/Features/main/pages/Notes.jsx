import React from 'react'
import HeroSection from '../components/Course/Hero-Section'
import CommonNavbar from '../components/Navbar/CommonNavbar'
import NoteCard from '../components/Notes/NoteCard'
import '../styles/Notes/NoteCard.scss'

const Notes = () => {

    const categories = [
        "All Categories",
        "Programming",
        "Web Development",
        "Database",
        "Networking",
        "AI & ML",
    ];
    return (
        <>

            <CommonNavbar title={"All Notes"}/>

            <div className="main-content">

                <HeroSection placeholder={"Search notes..."} categories={categories} title={"Study Notes"}/>
            </div>

            <div className="notes-container">

                <NoteCard />
            </div>
        </>
    )
}

export default Notes
