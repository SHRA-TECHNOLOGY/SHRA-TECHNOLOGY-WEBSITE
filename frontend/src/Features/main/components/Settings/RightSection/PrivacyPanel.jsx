import React, { useEffect } from "react";
import {
    X,
    ShieldCheck,
    UserRound,
    LockKeyhole,
    Cookie,
    FileText,
    Mail,
    ChevronRight,
    Shield,
    CheckCircle2,
} from "lucide-react";

import "../../../styles/Settings/PrivacyPanel.scss";

const privacySections = [
    {
        icon: ShieldCheck,
        title: "Data Protection",
        description:
            "How SHRA Technology handles your personal information.",
        content:
            "SHRA Technology aims to protect your personal information through reasonable security practices. Access to personal information should be limited to authorized purposes.",
    },
    {
        icon: UserRound,
        title: "Personal Information",
        description: "Information associated with your account.",
        content:
            "Your account may contain information such as your name, email address, profile details, course enrollments, learning progress and test results, depending on the features you use.",
    },
    {
        icon: LockKeyhole,
        title: "Account Security",
        description: "Keep your account safe.",
        content:
            "Use a strong password and never share it with anyone. Always log out when using a shared computer. If you notice suspicious account activity, contact SHRA Technology Support.",
    },
    {
        icon: Cookie,
        title: "Cookies & Sessions",
        description: "Understand how your login session works.",
        content:
            "Authentication cookies may be used to maintain your login session. Sessions can expire or be invalidated for security reasons, in which case you may need to log in again.",
    },
    {
        icon: FileText,
        title: "Your Privacy",
        description: "Learn about your privacy choices.",
        content:
            "You can review your account information and contact SHRA Technology Support with questions about your personal information. Requests are handled according to applicable requirements and available account features.",
    },
];

const PrivacyPanel = () => {

    return (
        <section className="privacy-container">
            {/* Header */}
            <div className="privacy-container-header">
                <div className="privacy-container-icon">
                    <ShieldCheck size={25} />
                </div>

                <div>
                    <span className="privacy-panel-eyebrow">
                        SHRA TECHNOLOGY
                    </span>

                    <h2>Privacy & Security</h2>

                    <p>Your privacy matters to us.</p>
                </div>
            </div>

            {/* Banner */}
            <div className="privacy-panel-banner">
                <div className="privacy-banner-icon">
                    <Shield size={29} />
                </div>

                <div>
                    <h3>Your Privacy Matters</h3>

                    <p>
                        Learn how your account information and learning
                        activity may be handled on SHRA Technology.
                    </p>
                </div>
            </div>

            {/* Security Notice */}
            <div className="privacy-security-note">
                <CheckCircle2 size={19} />

                <p>
                    We aim to use reasonable measures to protect your
                    information and improve account security.
                </p>
            </div>

            {/* Privacy Sections */}
            <div className="privacy-panel-content">
                <h3 className="privacy-content-heading">
                    Privacy Overview
                </h3>

                <div className="privacy-section-list">
                    {privacySections.map((section) => {
                        const Icon = section.icon;

                        return (
                            <details
                                className="privacy-section-item"
                                key={section.title}
                            >
                                <summary>
                                    <div className="privacy-section-icon">
                                        <Icon size={20} />
                                    </div>

                                    <div className="privacy-section-info">
                                        <h4>{section.title}</h4>
                                        <p>{section.description}</p>
                                    </div>

                                    <ChevronRight
                                        size={19}
                                        className="privacy-section-chevron"
                                    />
                                </summary>

                                <div className="privacy-section-details">
                                    <p>{section.content}</p>
                                </div>
                            </details>
                        );
                    })}
                </div>
            </div>

            {/* Support */}
            <div className="privacy-support-card">
                <div className="privacy-support-icon">
                    <Mail size={21} />
                </div>

                <div>
                    <h3>Privacy Questions?</h3>

                    <p>
                        Contact SHRA Technology Support for assistance
                        with privacy-related questions.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="privacy-panel-footer">
                <p>SHRA Technology · Privacy & Security</p>
            </div>
        </section>
    );
};

export default PrivacyPanel;