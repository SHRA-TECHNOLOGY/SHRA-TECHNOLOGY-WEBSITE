import { useEffect } from 'react';

import CommonNavbar from '../../components/Navbar/CommonNavbar';
import Hero from '../../components/Dashboard/Hero';
import DashboardStats from '../../components/Dashboard/Stats';

import ContinueLearning
  from '../../components/Dashboard/ContinueLearing/ContinueLearning';

import DailyChallenge
  from '../../components/Dashboard/DailyChallenge/DailyChallenge';

import WeeklyProgress
  from '../../components/Dashboard/WeeklyProgress/WeeklyProgress';

import LiveClass
  from '../../components/Dashboard/LiveClass/LiveClass';

import Achievements
  from '../../components/Dashboard/Achievements/Achievements';

import RecentActivity
  from '../../components/Dashboard/RecentActivity/RecentActivity';

import Announcements
  from '../../components/Dashboard/Announcements/Announcements';

import XP
  from '../../components/Dashboard/XP/XP';

import '../../styles/Dashboard/DashboardHome.scss';

import { useDashboard } from '../../Hooks/Dashboard/useDashboard';


const Dashboard = () => {

  /* ==========================================
     SCROLL REVEAL ANIMATION
  ========================================== */

  useEffect(() => {

    const cards = document.querySelectorAll(
      ".admin-main-content > *, " +
      ".center-section > *, " +
      ".dashboard-lowerPart > *"
    );

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            // Animation start
            entry.target.classList.remove("card-hidden");

            // Reflow force karta hai taaki animation dobara chale
            void entry.target.offsetWidth;

            entry.target.classList.add("card-visible");

          } else {

            // Viewport se bahar jaate hi reset
            entry.target.classList.remove("card-visible");
            entry.target.classList.add("card-hidden");

          }

        });

      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    cards.forEach((card) => {

      card.classList.add("card-hidden");

      observer.observe(card);

    });

    return () => {
      observer.disconnect();
    };

  }, []);


  /* ==========================================
     DASHBOARD DATA
  ========================================== */

  const {
    data,
    isLoading,
    isError,
  } = useDashboard();


  const profile = data?.profile;

  const progress = data?.progress;

  const gamification = data?.gamification;

  const dailyGoal = data?.dailyGoal;

  const weeklyProgress = data?.weeklyProgress;

  const recentActivity =
    data?.recentActivity || [];

  const recentResults =
    data?.recentResults || [];

  const announcements =
    data?.announcements || [];

  const badges =
    data?.badges || [];

  const courses =
    data?.courses || [];

  const continueLearning =
    data?.continueLearning;

  const upcomingLiveClass =
    data?.upcomingLiveClass;


  /* ==========================================
     UI
  ========================================== */

  return (
    <>

      <CommonNavbar title="Dashboard" />


      {/* ======================================
          HERO
      ====================================== */}

      <Hero
        profile={profile}
        gamification={gamification}
      />


      {/* ======================================
          MAIN DASHBOARD
      ====================================== */}

      <div className="admin-main-content">


        {/* ====================================
            STATS
        ==================================== */}

        <DashboardStats
          progress={progress}
        />


        {/* ====================================
            CENTER SECTION
        ==================================== */}

        <div className="center-section">


          {/* Continue Learning */}

          <ContinueLearning
            continueLearning={continueLearning}
          />


          {/* Daily Challenge */}

          <DailyChallenge
            dailyGoal={dailyGoal}
          />


          {/* Weekly Progress */}

          <WeeklyProgress
            weeklyProgress={weeklyProgress}
          />


          {/* Upcoming Live Class */}

          <LiveClass
            upcomingLiveClass={upcomingLiveClass}
          />


          {/* Future Sections */}

          {/* <Recommendation /> */}

          {/* <Roadmap /> */}


          {/* Achievements */}

          <Achievements
            badges={badges}
          />


          {/* XP */}

          <XP
            gamification={gamification}
          />

        </div>


        {/* ====================================
            LOWER SECTION
        ==================================== */}

        <div className="dashboard-lowerPart">


          {/* Recent Activity */}

          <RecentActivity
            recentActivity={recentActivity}
          />


          {/* Announcements */}

          <Announcements
            announcements={announcements}
          />

        </div>

      </div>

    </>
  );
};


export default Dashboard;