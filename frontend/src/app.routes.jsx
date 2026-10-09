import { createBrowserRouter } from "react-router";

import Login from "./Features/auth/pages/Login";
import Register from "./Features/auth/pages/Register";

import AuthLayout from "./Features/Layout/AuthLayout";
import CommonLayout from "./Features/Layout/CommonLayout";

import { PublicHome } from "./Features/PublicHome";

import Course from "./Features/main/pages/Course/Course";
import MyCourse from "./Features/main/pages/MyCourse/MyCourse";
import CourseDetails from "./Features/main/pages/Course/CourseDetails";

import Notes from "./Features/main/pages/Notes";
import LiveClasses from "./Features/main/pages/LiveClasses";
import Attendance from "./Features/main/pages/Attendance";
import ContactUs from "./Features/main/pages/ContactUs";

import AdminPanel from "./Features/main/pages/AdminPanel";

import Certificate from "./Features/main/pages/Certificate";

import TestHome from "./Features/main/pages/TestSection/TestHome";
import TestTopicOverview from "./Features/main/pages/TestSection/TestTopicOverview";
import TestInstruction from "./Features/main/pages/TestSection/TestInstruction";
import TestAttempt from "./Features/main/pages/TestSection/TestAttempt";
import TestResult from "./Features/main/pages/TestSection/TestResult";
import TestReview from "./Features/main/pages/TestSection/TestReview";

import Practice from "./Features/main/pages/Practice/Practice";
import PracticeQuestions from "./Features/main/pages/Practice/PracticeQuestions";
import CodeRunEditor from "./Features/main/pages/Practice/CodeRunEditor";

import Dashboard from "./Features/main/pages/Dashboard/Dashboard";
import Profile from "./Features/main/pages/Profile";
import Setting from "./Features/main/pages/Setting";

import Notification from "./Features/main/components/Notification/Notification";

import ForgotPassword from "./Features/auth/pages/ForgotPassword";
import ResetPassword from "./Features/auth/pages/ResetPassword";

import ProtectedRoute from "./Features/ProtectedRoute";
import AdminRoute from "./Features/AdminRoute";


export const router = createBrowserRouter([

    // =====================================================
    // AUTH
    // =====================================================

    {
        element: <AuthLayout />,

        children: [

            {
                path: "/login",
                element: <Login />,
            },

            {
                path: "/register",
                element: <Register />,
            },

        ],
    },


    // =====================================================
    // PUBLIC AUTH ROUTES
    // =====================================================

    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },

    {
        path: "/reset-password/:resetToken",
        element: <ResetPassword />,
    },


    // =====================================================
    // PUBLIC HOME
    // =====================================================

    {
        path: "/",
        element: <PublicHome />,
    },


    // =====================================================
    // PROTECTED ROUTES
    // =====================================================

    {
        element: <ProtectedRoute />,

        children: [

            // =================================================
            // COMMON LAYOUT
            // =================================================

            {
                element: <CommonLayout />,

                children: [

                    // =========================================
                    // USER ROUTES
                    // =========================================

                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    },

                    {
                        path: "/profile",
                        element: <Profile />,
                    },

                    {
                        path: "/course",
                        element: <Course />,
                    },

                    {
                        path: "/my-course/:userId",
                        element: <MyCourse />,
                    },

                    {
                        path: "/course/:courseId",
                        element: <CourseDetails />,
                    },

                    {
                        path: "/notes",
                        element: <Notes />,
                    },

                    {
                        path: "/live-classes",
                        element: <LiveClasses />,
                    },

                    {
                        path: "/attendance",
                        element: <Attendance />,
                    },

                    {
                        path: "/contact-us",
                        element: <ContactUs />,
                    },

                    {
                        path: "/certificates",
                        element: <Certificate />,
                    },


                    // =========================================
                    // NOTIFICATIONS
                    // =========================================

                    {
                        path: "/notifications",
                        element: <Notification />,
                    },


                    // =========================================
                    // TESTS
                    // =========================================

                    {
                        path: "/tests",
                        element: <TestHome />,
                    },

                    {
                        path: "/tests/:courseId",
                        element: <TestTopicOverview />,
                    },

                    {
                        path: "/tests/category/:slug",
                        element: <TestTopicOverview />,
                    },

                    {
                        path: "/tests/:courseId/:testSlug",
                        element: <TestInstruction />,
                    },

                    {
                        path: "/tests/:courseId/:testSlug/attempt",
                        element: <TestAttempt />,
                    },

                    {
                        path: "/tests/:courseId/:testSlug/:resultId/result",
                        element: <TestResult />,
                    },

                    {
                        path: "/tests/:courseId/:testSlug/:resultId/review",
                        element: <TestReview />,
                    },


                    // =========================================
                    // PRACTICE
                    // =========================================

                    {
                        path: "/practice",
                        element: <Practice />,
                    },

                    {
                        path: "/practice/:slug",
                        element: <PracticeQuestions />,
                    },

                    {
                        path: "/practice/:slug/:difficulty/:problemSlug",
                        element: <CodeRunEditor />,
                    },


                    // =========================================
                    // SETTINGS
                    // =========================================

                    {
                        path: "/settings",
                        element: <Setting />,
                    },


                    // =========================================
                    // ADMIN
                    // =========================================

                    {
                        element: <AdminRoute />,

                        children: [

                            {
                                path: "/admin-panel",
                                element: <AdminPanel />,
                            },

                        ],
                    },

                ],
            },

        ],
    },

]);