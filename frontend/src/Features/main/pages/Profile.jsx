import React from "react";
import CommonNavbar from "../components/Navbar/CommonNavbar";
import Introduce from "../components/Profile/Introduce";
import Progress from "../components/Profile/Progress";
import Recent from "../components/Profile/Recent";
import Badge from "../components/Profile/Badge";
import "../styles/Profile/ProfileHome.scss";

import {
  FaAward,
  FaCrown,
  FaBolt,
  FaTrophy,
  FaClipboardList,
} from "react-icons/fa";

import { Check, RefreshCw } from "lucide-react";

import { useProfileDashboard } from "../Hooks/Profile/useProfile";

const Profile = () => {

  const {
    data: profileDashboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useProfileDashboard();


  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {

    return (
      <div className="profile-page">

        <CommonNavbar
          title="Profile"
          message="Manage your profile information."
        />

        <main className="profile-state-container">

          <div className="profile-state-card profile-loading-card">

            <div className="profile-loader">

              <div className="profile-loader-ring"></div>

              <div className="profile-loader-icon">
                <span></span>
              </div>

            </div>

            <h2>Loading Profile</h2>

            <p>
              Please wait while we load your profile information.
            </p>


            {/* Skeleton */}

            <div className="profile-loading-skeleton">

              <span className="skeleton-large"></span>

              <div className="skeleton-row">
                <span></span>
                <span></span>
              </div>

              <span className="skeleton-medium"></span>

            </div>

          </div>

        </main>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {

    return (
      <div className="profile-page">

        <CommonNavbar
          title="Profile"
          message="Manage your profile information."
        />

        <main className="profile-state-container">

          <div className="profile-state-card profile-error-card">

            <div className="profile-error-icon">
              !
            </div>

            <h2>
              Unable to Load Profile
            </h2>

            <p>
              {error?.response?.data?.message ||
                "Something went wrong while loading your profile. Please try again."}
            </p>


            <button
              type="button"
              className="profile-retry-btn"
              onClick={() => refetch()}
            >

              <RefreshCw size={17} />

              Try Again

            </button>

          </div>

        </main>

      </div>
    );
  }


  // ==========================================
  // BACKEND DATA
  // ==========================================

  const userInfo =
    profileDashboard?.profile || {};

  const progressStats =
    profileDashboard?.progress || {};

  const backendRecentActivity =
    profileDashboard?.recentActivity || [];

  const badgesEarned =
    profileDashboard?.badges || [];


  // ==========================================
  // RECENT ACTIVITY
  // ==========================================

  const recentActivity =
    backendRecentActivity.map(
      (activity, index) => ({
        id: index + 1,

        title:
          `${activity.action} ${activity.title}`,

        time: activity.createdAt,

        tag:
          activity.type === "problem"
            ? activity.difficulty || "Easy"
            : "Test",

        icon:
          activity.type === "problem"
            ? <Check />
            : <FaClipboardList />,

        type:
          activity.type === "problem"
            ? "success"
            : "test",

        score:
          activity.score ?? null,
      })
    );


  // ==========================================
  // BADGES
  // ==========================================

  const badgeIcons = [
    <FaAward />,
    <FaCrown />,
    <FaBolt />,
    <FaTrophy />,
  ];

  const badgeColors = [
    "#2563EB",
    "#F59E0B",
    "#7C3AED",
    "#14B8A6",
  ];

  const badges = badgesEarned.map(
    (item, index) => ({
      id:
        item._id ||
        item.badge?._id ||
        index + 1,

      title:
        item.badge?.title ||
        item.badge?.name ||
        "Badge",

      description:
        item.badge?.description || "",

      icon:
        badgeIcons[index % badgeIcons.length],

      color:
        item.badge?.color ||
        badgeColors[index % badgeColors.length],
    })
  );


  // ==========================================
  // FINAL PROFILE DATA
  // ==========================================

  const profileData = {

    id:
      userInfo._id ||
      userInfo.username,

    name:
      userInfo.name ||
      userInfo.username ||
      "User",

    username:
      userInfo.username
        ? `@${userInfo.username}`
        : "",

    email:
      userInfo.email || "",

    phone:
      userInfo.mobile || "",

    avatar:
      userInfo.profileImage ||
      "/images/avatar.png",

    profileImage:
      userInfo.profileImage || "",

    bio:
      userInfo.bio || "",

    role: "Active Learner",

    country: "India",

    city:
      userInfo.city || "",

    joinedDate:
      userInfo.joinedAt || "",

    stats: {

      problemsSolved:
        progressStats.problemSolved || 0,

      testsTaken:
        progressStats.testTaken || 0,

      averageScore:
        progressStats.averageScore || 0,

      badgesEarned:
        progressStats.badgeEarned || 0,

      courseEnroll:
        progressStats.courseEnroll || 0,

    },

    recentActivity,

    badges,

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="profile-page">

      <CommonNavbar
        title="Profile"
        message="Manage your profile information."
      />

      <main className="main-container-profile">

        <Introduce
          profileData={profileData}
        />

        <Progress
          profileData={profileData}
        />

        <Recent
          profileData={profileData}
        />

        <Badge
          profileData={profileData}
        />

      </main>

    </div>

  );
};

export default Profile;