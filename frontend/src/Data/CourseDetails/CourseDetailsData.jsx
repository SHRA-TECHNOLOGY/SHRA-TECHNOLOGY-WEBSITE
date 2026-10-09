export const courseData = {
    id: 1,

    title: "Complete C++ DSA Bootcamp",

    subtitle:
        "Master Data Structures and Algorithms with C++. This comprehensive course covers everything from basics to advanced topics with hands-on projects and interview preparation.",

    category: "Programming",

    language: "Hindi + English",

    level: "Beginner",

    duration: "40 Hours",

    lectures: 156,

    students: "12,500",

    rating: 4.9,

    reviews: 4250,

    updatedAt: "July 2026",

    noEnrolled:true, //True or False

    currentLesson: {
        id: 1,
        title: "Installing C++ Compiler",
        duration: "12:45",
        videoUrl: "",
        thumbnail: "/assets/course/video-thumbnail.png",
        isLocked: false,
    },

    pricing: {
        type: "Free",
        originalPrice: 999,
        price: 0,
        enrolled: true,
        progress: 12,
    },

    instructor: {
        name: "Rahul Sharma",
        role: "Senior Software Engineer at Google",
        image: "/assets/instructors/rahul.png",
    },

    resources: [
        {
            id: 1,
            title: "Download Notes (PDF)",
            icon: "download",
        },
        {
            id: 2,
            title: "Source Code (GitHub)",
            icon: "github",
        },
        {
            id: 3,
            title: "Certificate Preview",
            icon: "certificate",
        },
    ],

    includes: [
        "40 hours of on-demand video",
        "156 downloadable resources",
        "Full lifetime access",
        "Access on mobile and desktop",
        "Certificate of completion",
        "30-day money-back guarantee",
    ],

    sections: [
        {
            id: 1,
            title: "Introduction to C++ and Setup",
            lectures: 8,
            duration: "2 hours",
            isOpen: true,

            lessons: [
                {
                    id: 1,
                    title: "Welcome to the Course",
                    duration: "5:30",
                    type: "video",
                    isPreview: true,
                    isLocked: false,
                    isCompleted: false,
                    videoUrlId: "9Imvh6wYjOM",
                },

                {
                    id: 2,
                    title: "Installing C++ Compiler",
                    duration: "12:45",
                    type: "video",
                    isPreview: true,
                    isLocked: false,
                    isCompleted: false,
                    videoUrlId: "-CojaMIv2H6eNq6F",
                },

                {
                    id: 3,
                    title: "Your First C++ Program",
                    duration: "18:20",
                    type: "video",
                    isPreview: true,
                    isLocked: false,
                    isCompleted: false,
                    videoUrlId: "giemsc4Ww1nsH-2P",
                },

                {
                    id: 4,
                    title: "Variables and Data Types",
                    duration: "22:15",
                    type: "video",
                    isPreview: false,
                    isLocked: true,
                    isCompleted: false,
                    videoUrlId: "",
                },

                {
                    id: 5,
                    title: "Operators in C++",
                    duration: "25:40",
                    type: "video",
                    isPreview: false,
                    isLocked: true,
                    isCompleted: false,
                    videoUrlId: "",
                },

                {
                    id: 6,
                    title: "Input and Output",
                    duration: "15:30",
                    type: "video",
                    isPreview: false,
                    isLocked: true,
                    isCompleted: false,
                    videoUrlId: "",
                },

                {
                    id: 7,
                    title: "Control Flow Statements",
                    duration: "28:10",
                    type: "video",
                    isPreview: false,
                    isLocked: true,
                    isCompleted: false,
                    videoUrlId: "",
                },

                {
                    id: 8,
                    title: "Practice Problems",
                    duration: "20:00",
                    type: "practice",
                    isPreview: false,
                    isLocked: true,
                    isCompleted: false,
                },
            ],
        },

        {
            id: 2,
            title: "Arrays and Strings",
            lectures: 12,
            duration: "4 hours",
            isOpen: false,

            lessons: [
                {
                    id: 1,
                    title: "Introduction to Arrays",
                    duration: "10:15",
                    type: "video",
                    isLocked: true,
                },

                {
                    id: 2,
                    title: "Array Traversal",
                    duration: "18:30",
                    type: "video",
                    isLocked: true,
                },

                {
                    id: 3,
                    title: "Searching in Arrays",
                    duration: "22:00",
                    type: "video",
                    isLocked: true,
                },

                {
                    id: 4,
                    title: "Strings Basics",
                    duration: "19:20",
                    type: "video",
                    isLocked: true,
                },
            ],
        },

        {
            id: 3,
            title: "Pointers and References",
            lectures: 10,
            duration: "3.5 hours",
            isOpen: false,
            lessons: [],
        },

        {
            id: 4,
            title: "Object Oriented Programming",
            lectures: 15,
            duration: "5 hours",
            isOpen: false,
            lessons: [],
        },

        {
            id: 5,
            title: "Data Structures Fundamentals",
            lectures: 20,
            duration: "7 hours",
            isOpen: false,
            lessons: [],
        },
    ],
};