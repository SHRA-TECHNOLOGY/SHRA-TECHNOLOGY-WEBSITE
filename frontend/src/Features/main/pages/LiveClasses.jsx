import React, { useState } from 'react'
import LiveClassCards from '../components/LiveClasses/LiveClassCards'
import '../styles/LiveClasses/LiveClasses.scss'
import CommonNavbar from '../components/Navbar/CommonNavbar'

const LiveClasses = () => {
    const [activeTab, setActiveTab] = useState("upcoming")
    return (
        <>

            <CommonNavbar title={"Live Classes"}/>

            <div className="main-content">

                <div className="classes-status">
                    <button className={activeTab === "upcoming" ? "active" : ""} onClick={() => setActiveTab("upcoming")}>Upcoming Classes</button>

                    <button className={activeTab === "previous" ? "active" : '' } onClick={() => setActiveTab("previous")}>Previous Classes</button>
                </div>

                <LiveClassCards activeTab={activeTab} />

            </div>
        </>
    )
}

export default LiveClasses
