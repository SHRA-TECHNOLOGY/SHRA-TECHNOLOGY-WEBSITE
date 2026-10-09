import React from 'react'
import { useNavigate } from 'react-router';
import '../../../styles/Test/TestHome/TestOverview.scss'
import {
  CalendarDays,
  CalendarRange,
  Zap,
  ClipboardList
} from "lucide-react";

const TestOverviewSection = ({ mock, weekly, latest, monthly }) => {

    const navigate = useNavigate()

    // data 
    const testCategories = [
        {
            id: 1,
            slug: "weekly",
            title: "Weekly Tests",
            description: "New tests every week",
            tests: weekly.length,
            buttonText: "Explore",
            icon: CalendarDays,
            color: "purple",
            iconBg: "#4F46E5",
            buttonBg: "#4338CA",
            buttonHover: "#3730A3",
        },
        {
            id: 2,
            slug: "monthly",
            title: "Monthly Tests",
            description: "Comprehensive monthly tests",
            tests: monthly.length,
            buttonText: "Explore",
            icon: CalendarRange,
            color: "green",
            iconBg: "#16A34A",
            buttonBg: "#15803D",
            buttonHover: "#166534",
        },
        {
            id: 3,
            slug: "latest",
            title: "Latest Tests",
            description: "Recently added tests",
            tests: latest.length,
            buttonText: "Explore",
            icon: Zap,
            color: "orange",
            iconBg: "#F59E0B",
            buttonBg: "#D97706",
            buttonHover: "#B45309",
        },
        {
            id: 4,
            slug: "mock",
            title: "Mock Tests",
            description: "Full length mock tests",
            tests: mock.length,
            buttonText: "Explore",
            icon: ClipboardList,
            color: "blue",
            iconBg: "#2563EB",
            buttonBg: "#1D4ED8",
            buttonHover: "#1E40AF",
        },
    ];

    return (
        <div className="test-overview">
            {testCategories.map((item) => {
                const Icon = item.icon;

                return (
                    <div className="test-card">

                        {/* Top */}
                        <div className="card-header">
                            <div
                                className="icon-box"
                                style={{ backgroundColor: item.iconBg }}
                            >
                                <Icon size={22} />
                            </div>

                            <div className="header-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>

                        {/* Middle */}
                        <div className="card-body">
                            <h2>{item.tests}</h2>
                            <span>Tests Available</span>
                        </div>

                        {/* Bottom */}
                        <div className="card-footer">
                            <button
                                style={{ backgroundColor: item.buttonBg }}
                                onClick={() => navigate(`/tests/category/${item.slug}`)}
                            >
                                {item.buttonText}
                            </button>
                        </div>

                    </div>
                );
            })}

        </div>
    )
}

export default TestOverviewSection
