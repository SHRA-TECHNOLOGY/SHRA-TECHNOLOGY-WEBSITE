export const courseData = {
    id: 1,

    title: "Complete C++ DSA Bootcamp",

    description:
        "Master Data Structures & Algorithms using modern C++.",

    instructor: {
        name: "Sonu Yadav",

        image: "/profile.png",
    }, 
    
    isEnroll:true,

    rating:4.9,

    students:12500,

    courseDuration:"10 Hours",

    lectures: 156,


    instructor: {
        name: "Rahul Sharma",
        role: "Senior Software Engineer at Google",
        image: "/assets/instructors/rahul.png",
    },

    sections: [

        {
            id: 1,

            title: "Introduction to C++",

            lectures: 8,

            duration: "2 Hours",

            lessons: [

                {
                    id: 1,

                    title: "Welcome to the Course",

                    youtubeId: "9Imvh6wYjOM",

                    duration: "5:30",

                    preview: true,

                    locked: false,

                    completed: false,
                },

                {
                    id: 2,

                    title: "Installing C++ Compiler",

                    youtubeId: "xVe-Qa8mNr4",

                    duration: "12:45",

                    preview: true,

                    locked: false,

                    completed: false,
                },

                {
                    id: 3,

                    title: "Variables",

                    youtubeId: "YOUR_VIDEO_ID",

                    duration: "18:20",

                    preview: false,

                    locked: true,

                    completed: false,
                },

            ],
        },

        {
            id: 2,

            title: "Arrays",

            lectures: 12,

            duration: "4 Hours",

            lessons: [

                {
                    id: 4,

                    title: "Introduction to Arrays",

                    youtubeId: "YOUR_VIDEO_ID",

                    duration: "9:20",

                    preview: false,

                    locked: true,

                    completed: false,
                },

            ],
        },

    ],
};