import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import "../../../styles/Test/TestInstruction/MainSection.scss";

import {
  Clock3,
  FileText,
  Trophy,
  CircleMinus,
  Target,
  CircleCheck,
  Lightbulb,
  Play,
} from "lucide-react";

import {
  SiC,
  SiPython,
  SiCplusplus,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";


const TestInstructions = ({ testInstructions }) => {

  const navigate = useNavigate();

  const { courseId, testSlug } = useParams();

  const [isAgree, setIsAgree] = useState(false);


  // =========================
  // Backend Data
  // =========================

  const testDetails = testInstructions?.testDetails;
  const instruction = testInstructions?.instruction;


  // =========================
  // Course/Test UI Data
  // =========================

  const courseUI = {
    "C Language": {
      icon: SiC,
      color: "#3B82F6",
    },

    "Python": {
      icon: SiPython,
      color: "#3776AB",
    },

    "C++": {
      icon: SiCplusplus,
      color: "#00599C",
    },

    "Java": {
      icon: FaJava,
      color: "#F89820",
    },
  };


  const uiData =
    courseUI[testDetails?.subject] || {
      icon: FileText,
      color: "#5B4CF6",
    };


  const LogoIcon = uiData.icon;


  // =========================
  // Dynamic Values
  // =========================

  const totalQuestions =
    testDetails?.totalQuestions || 0;

  const totalMarks =
    testDetails?.totalMarks || 0;

  const duration =
    testDetails?.duration || 0;

  const negativeMarking =
    testDetails?.negativeMarking || 0;

  const passingPercentage =
    testDetails?.passingPercentage || 0;


  const passingMarks = Math.ceil(
    (totalMarks * passingPercentage) / 100
  );


  // =========================
  // Stats
  // =========================

  const stats = [
    {
      id: 1,
      title: "Time",
      value: `${duration} mins`,
      subtitle: "",
      icon: Clock3,
      color: "#5B4CF6",
    },

    {
      id: 2,
      title: "Total Questions",
      value: totalQuestions,
      subtitle: "",
      icon: FileText,
      color: "#3B82F6",
    },

    {
      id: 3,
      title: "Total Marks",
      value: totalMarks,
      subtitle: "",
      icon: Trophy,
      color: "#22C55E",
    },

    {
      id: 4,
      title: "Negative Marking",
      value: `${negativeMarking} marks`,
      subtitle: "For each wrong answer",
      icon: CircleMinus,
      color: "#EF4444",
    },

    {
      id: 5,
      title: "Passing Marks",
      value: `${passingMarks} (${passingPercentage}%)`,
      subtitle: "To pass the test",
      icon: Target,
      color: "#F59E0B",
    },
  ];


  return (

    <div className="test-instructions-page">

      {/* Header */}

      <div className="instruction-header">

        <h2>
          Test Instructions
        </h2>

        <p>
          Please read the instructions carefully before you start the test.
        </p>

      </div>


      {/* Card */}

      <div className="instruction-card">


        {/* Top */}

        <div className="instruction-top">

          <div className="test-basic-info">

            <div
              className="test-icon"
              style={{
                background: `${uiData.color}15`,
              }}
            >

              <LogoIcon
                size={42}
                color={uiData.color}
              />

            </div>


            <div>

              <div className="title-row">

                <h3>
                  {testDetails?.title || "Test"}
                </h3>


                <span
                  className="difficulty"
                  style={{
                    color:
                      testDetails?.difficulty === "Easy"
                        ? "#22C55E"
                        : testDetails?.difficulty === "Medium"
                          ? "#F59E0B"
                          : "#EF4444",

                    background:
                      testDetails?.difficulty === "Easy"
                        ? "#22C55E20"
                        : testDetails?.difficulty === "Medium"
                          ? "#F59E0B20"
                          : "#EF444420",
                  }}
                >

                  {testDetails?.difficulty || "Easy"}

                </span>

              </div>


              <p>
                {testDetails?.description || ""}
              </p>

            </div>

          </div>

        </div>


        {/* Stats */}

        <div className="instruction-stats">

          {stats.map((item) => {

            const Icon = item.icon;

            return (

              <div
                className="single-stat"
                key={item.id}
              >

                <Icon
                  size={32}
                  color={item.color}
                />

                <span>
                  {item.title}
                </span>

                <h3>
                  {item.value}
                </h3>

                {item.subtitle && (
                  <p>
                    {item.subtitle}
                  </p>
                )}

              </div>

            );

          })}

        </div>


        {/* Rules */}

        <div className="rules-section">

          <h3>
            Test Rules
          </h3>


          <div className="rules-list">

            {instruction?.rules?.map(
              (rule, index) => (

                <div
                  className="single-rule"
                  key={index}
                >

                  <CircleCheck
                    size={18}
                    color="#5B4CF6"
                    fill="#5B4CF6"
                  />

                  <p>
                    {index + 1}. {rule}
                  </p>

                </div>

              )
            )}

          </div>

        </div>


        {/* Important Note */}

        <div className="important-note">

          <Lightbulb
            size={34}
            color="#FBBF24"
          />

          <div>

            <h4>
              Important Note
            </h4>

            <p>
              {instruction?.importantNote || ""}
            </p>

          </div>

        </div>

      </div>


      {/* Agreement */}

      <div className="instruction-footer">

        <label>

          <input
            type="checkbox"
            checked={isAgree}
            onChange={() =>
              setIsAgree(!isAgree)
            }
          />

          I have read and understood all the instructions.
          I agree to all the test rules.

        </label>


        <button
          disabled={!isAgree}
          onClick={() =>
            navigate(
              `/tests/${courseId}/${testSlug}/attempt`
            )
          }
        >

          <Play
            size={24}
            fill="white"
          />

          Start Test

        </button>

      </div>

    </div>

  );
};


export default TestInstructions;