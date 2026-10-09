import React, { useState } from 'react'
import { Outlet } from 'react-router'
import LeftNavbar from '../main/components/Navbar/LeftNavbar'
import '../main/styles/Layout/CommonLayout.scss'

const CommonLayout = () => {

    const [expandSidebar, setExpandSidebar] = useState(false)
    return (
        <div className="common-container">

            <LeftNavbar expandSidebar={expandSidebar}
                setExpandSidebar={setExpandSidebar} />

            <div className={`right-section ${expandSidebar ? "expand" : ""}`}>
                <Outlet />
            </div>


        </div>
    )
}

export default CommonLayout
