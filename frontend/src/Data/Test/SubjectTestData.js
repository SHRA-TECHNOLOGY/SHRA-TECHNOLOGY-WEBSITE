import { FileText } from "lucide-react";
import {
  SiC,
  SiPython,
  SiCplusplus,
  SiJavascript,
} from "react-icons/si";

export const subjectTests = {
  "C Language": [
    {
      id: 1,
      slug: "C Basics Test-1",

      logoIcon: SiC,
      iconColor: "#3B82F6",

      title: "C Basics - Test 1",
      description: "Basics of C Programming",
      
      difficulty: "Easy",
      difficultyColor: "#22C55E",

      questions: 20,
      duration: 30,
      totalMarks: 20,

      bestScore: 18,
      bestPercentage: 90,

      attempts: 2,

      passingMarks: 10,
      passingPercentage: 50,
      negativeMarking: 0.5,

      icon: FileText,

      buttonText: "Start Test",

      // isCompleted: true,
      // isLocked: false,
    },

    {
      id: 2,
      slug: "operators-test-1",

      title: "Operators in C - Test 1",
      description: "Operators and Expressions",

      difficulty: "Easy",
      difficultyColor: "#22C55E",

      questions: 20,
      duration: 30,
      totalMarks: 20,

      bestScore: 20,
      bestPercentage: 100,

      attempts: 1,

      passingMarks: 10,
      passingPercentage: 50,
      negativeMarking: 0.5,

      icon: FileText,

      buttonText: "Start Test",

      isCompleted: true,
      isLocked: false,
    },

    {
      id: 3,
      slug: "control-statements-test-1",

      title: "Control Statements - Test 1",
      description: "If, Else, Switch, Loops",

      difficulty: "Medium",
      difficultyColor: "#F59E0B",

      questions: 25,
      duration: 35,
      totalMarks: 25,

      bestScore: 18,
      bestPercentage: 72,

      attempts: 2,

      passingMarks: 10,
      passingPercentage: 50,
      negativeMarking: 0.5,

      icon: FileText,

      buttonText: "Start Test",

      isCompleted: true,
      isLocked: false,
    },

    {
      id: 4,
      slug: "functions-test-1",

      title: "Functions in C - Test 1",
      description: "Functions and Recursion",

      difficulty: "Medium",
      difficultyColor: "#F59E0B",

      questions: 25,
      duration: 40,
      totalMarks: 25,

      bestScore: 17,
      bestPercentage: 68,

      attempts: 1,

      passingMarks: 10,
      passingPercentage: 50,
      negativeMarking: 0.5,

      icon: FileText,

      buttonText: "Start Test",

      isCompleted: true,
      isLocked: false,
    },

    {
      id: 5,
      slug: "pointers-test-1",

      title: "Pointers in C - Test 1",
      description: "Pointers and Memory",

      difficulty: "Hard",
      difficultyColor: "#EF4444",

      questions: 25,
      duration: 45,
      totalMarks: 25,

      bestScore: 15,
      bestPercentage: 60,

      attempts: 3,
      passingMarks: 10,
      passingPercentage: 50,
      negativeMarking: 0.5,

      icon: FileText,

      buttonText: "Start Test",

      isCompleted: true,
      isLocked: false,
    },

    {
      id: 6,
      slug: "arrays-test-1",

      title: "Arrays in C - Test 1",
      description: "1D, 2D Arrays and Strings",

      difficulty: "Medium",
      difficultyColor: "#F59E0B",

      questions: 20,
      duration: 30,
      totalMarks: 20,

      bestScore: 16,
      bestPercentage: 80,

      attempts: 1,
      passingMarks: 10,
      passingPercentage: 50,
      negativeMarking: 0.5,

      icon: FileText,

      buttonText: "Start Test",

      isCompleted: true,
      isLocked: false,
    },

    {
      id: 7,
      slug: "file-handling-test-1",

      title: "File Handling in C - Test 1",
      description: "File Operations in C",

      difficulty: "Hard",
      difficultyColor: "#EF4444",

      questions: 25,
      duration: 45,
      totalMarks: 25,

      bestScore: 12,
      bestPercentage: 48,

      attempts: 2,
      passingMarks: 10,
      passingPercentage: 50,
      negativeMarking: 0.5,

      icon: FileText,

      buttonText: "Start Test",

      isCompleted: true,
      isLocked: false,
    },
  ],

  python: [],

  cpp: [],

  java: [],

  javascript: [],

  "data-structures": [],
};
