import {
  CalendarDays,
  CalendarRange,
  Zap,
  ClipboardList,
  Boxes,
  ArrowRight,
  CircleCheck,
  Star
} from "lucide-react";

import {
  SiC,
  SiPython,
  SiCplusplus,
  SiJavascript,
} from "react-icons/si";

import { FaJava,FaPython } from "react-icons/fa";

// ui logo
export const courseUI = {
    "c-language": {
      icon: SiC,
      iconColor: "#3B82F6",
    },

    "java": {
      icon: FaJava,
      iconColor: "#F89820",
    },

    "python": {
      icon: FaPython,
      iconColor: "#3776AB",
    },

    "cpp": {
      icon: SiCplusplus,
      iconColor: "#00599C",
    },
  };

// data with backend
export const createCourseCard = (data, uiData) => {

  const tests = data?.totalTests || 0;
  const attemptedTests = data?.totalAttempted || 0;
  const averageScore = data?.averageScore || 0;

  return {
    id: data?.course?._id,
    title: data?.course?.title,
    description: data?.course?.description,

    tests,
    attemptedTests,
    averageScore,

    icon: uiData?.icon,
    iconColor: uiData?.iconColor,

    route: `/tests/${data?.course?.slug}`,

    stats: [
      {
        title: "Total Tests",
        value: tests,
        icon: ClipboardList,
        color: "#4F46E5",
      },
      {
        title: "Tests Attempted",
        value: attemptedTests,
        icon: CircleCheck,
        color: "#22C55E",
      },
      {
        title: "Average Score",
        value: `${averageScore}%`,
        icon: Star,
        color: "#F59E0B",
      },
    ],
  };
};

export const subjectWiseTests = [
  {
    id: 1,
    slug: "C Language",
    title: "C Language",
    description:
      "Practice and test your C programming skills with our curated tests.",
    tests: 12,
    attemptedTests: 8,
    averageScore: 72,

    icon: SiC,
    iconColor: "#3B82F6",

    route: "/tests/c-language",

    stats: [
      {
        title: "Total Tests",
        value: 12,
        icon: ClipboardList,
        color: "#4F46E5",
      },
      {
        title: "Tests Attempted",
        value: 8,
        icon: CircleCheck,
        color: "#22C55E",
      },
      {
        title: "Average Score",
        value: "72%",
        icon: Star,
        color: "#F59E0B",
      },
    ],
  },

  {
    id: 2,
    slug: "python",
    title: "Python",
    description:
      "Master Python with beginner to advanced level practice tests.",
    tests: 15,
    attemptedTests: 11,
    averageScore: 81,

    icon: SiPython,
    iconColor: "#FACC15",

    route: "/tests/python",

    stats: [
      {
        title: "Total Tests",
        value: 15,
        icon: ClipboardList,
        color: "#4F46E5",
      },
      {
        title: "Tests Attempted",
        value: 11,
        icon: CircleCheck,
        color: "#22C55E",
      },
      {
        title: "Average Score",
        value: "81%",
        icon: Star,
        color: "#F59E0B",
      },
    ],
  },
  {
    id: 3,
    slug: "cpp",
    title: "C++",
    tests: 10,
    icon: SiCplusplus,
    iconColor: "#2563EB",
    route: "/tests/cpp",
  },
  {
    id: 4,
    slug: "java",
    title: "Java",
    tests: 8,
    icon: FaJava,
    iconColor: "#F97316",
    route: "/tests/java",
  },
  {
    id: 5,
    slug: "javascript",
    title: "JavaScript",
    tests: 9,
    icon: SiJavascript,
    iconColor: "#FACC15",
    route: "/tests/javascript",
  },
  {
    id: 6,
    slug: "data-structures",
    title: "Data Structures",
    tests: 7,
    icon: Boxes,
    iconColor: "#22C55E",
    route: "/tests/data-structures",
  },
];


//recent data section here
export const recentResults = [
  {
    id: 1,
    testName: "Python Basics - Test 2",
    difficulty: "Easy",
    difficultyColor: "#22C55E",
    subject: "Python",
    subjectIcon: SiPython,
    subjectColor: "#FACC15",
    score: "18/20",
    accuracy: "90%",
    date: "18 May 2025",
    status: "Passed",
    statusColor: "#22C55E",
  },
  {
    id: 2,
    testName: "Control Statements - Test 1",
    difficulty: "Medium",
    difficultyColor: "#F59E0B",
    subject: "C Language",
    subjectIcon: SiC,
    subjectColor: "#3B82F6",
    score: "16/25",
    accuracy: "64%",
    date: "17 May 2025",
    status: "Passed",
    statusColor: "#22C55E",
  },
  {
    id: 3,
    testName: "Functions in C - Test 1",
    difficulty: "Medium",
    difficultyColor: "#F59E0B",
    subject: "C Language",
    subjectIcon: SiC,
    subjectColor: "#3B82F6",
    score: "15/25",
    accuracy: "60%",
    date: "16 May 2025",
    status: "Passed",
    statusColor: "#22C55E",
  },
  {
    id: 4,
    testName: "Pointers in C - Test 1",
    difficulty: "Hard",
    difficultyColor: "#EF4444",
    subject: "C Language",
    subjectIcon: SiC,
    subjectColor: "#3B82F6",
    score: "10/25",
    accuracy: "40%",
    date: "15 May 2025",
    status: "Failed",
    statusColor: "#EF4444",
  },
];


//leaderboard data here

export const leaderboardTabs = [
  {
    id: "week",
    label: "This Week",
  },
  {
    id: "month",
    label: "This Month",
  },
  {
    id: "allTime",
    label: "All Time",
  },
];

export const leaderboardData = {
  week: [
    {
      id: 1,
      rank: 1,
      name: "Aman Verma",
      avatar: "/images/users/aman.png",
      xp: 2450,
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: "Priya Sharma",
      avatar: "/images/users/priya.png",
      xp: 2100,
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      name: "Rohan Singh",
      avatar: "/images/users/rohan.png",
      xp: 1890,
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      name: "Varun Patel",
      avatar: "/images/users/varun.png",
      xp: 1650,
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      name: "You",
      avatar: "/images/users/you.png",
      xp: 1420,
      isCurrentUser: true,
    },
  ],

  month: [
    {
      id: 1,
      rank: 1,
      name: "Rohan Singh",
      avatar: "/images/users/rohan.png",
      xp: 8420,
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: "Aman Verma",
      avatar: "/images/users/aman.png",
      xp: 8110,
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      name: "Priya Sharma",
      avatar: "/images/users/priya.png",
      xp: 7890,
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      name: "You",
      avatar: "/images/users/you.png",
      xp: 7350,
      isCurrentUser: true,
    },
    {
      id: 5,
      rank: 5,
      name: "Varun Patel",
      avatar: "/images/users/varun.png",
      xp: 7100,
      isCurrentUser: false,
    },
  ],

  allTime: [
    {
      id: 1,
      rank: 1,
      name: "Aman Verma",
      avatar: "/images/users/aman.png",
      xp: 28540,
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: "Priya Sharma",
      avatar: "/images/users/priya.png",
      xp: 27320,
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      name: "Rohan Singh",
      avatar: "/images/users/rohan.png",
      xp: 26180,
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      name: "Varun Patel",
      avatar: "/images/users/varun.png",
      xp: 24890,
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      name: "You",
      avatar: "/images/users/you.png",
      xp: 22640,
      isCurrentUser: true,
    },
  ],
};