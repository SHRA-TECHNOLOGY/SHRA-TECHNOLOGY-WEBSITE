import React from 'react'
import { useNavigate } from 'react-router';
import {
    Compass,
} from "lucide-react";

const PageTitle = () => {

    const navigate = useNavigate()
    return (
        <>

            {/* =========================
          PAGE TITLE
      ========================== */}
            <section className="page-heading">

                <div>
                    <h1>My Courses</h1>

                    <p>
                        Continue learning or explore new skills.
                    </p>
                </div>

                {/* Browse Course Button */}
                <button className="browse-btn" onClick={() => {
                    navigate("/course")
                }}>
                    <Compass size={18} />
                    Browse Courses
                </button>

            </section>

        </>
    )
}

export default PageTitle
