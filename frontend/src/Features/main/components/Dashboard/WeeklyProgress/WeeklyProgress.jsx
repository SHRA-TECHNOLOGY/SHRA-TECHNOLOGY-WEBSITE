import EmptyState from "./EmptyState";
import "../../../styles/Dashboard/WeeklyProgress.scss";

const WeeklyProgress = ({ weeklyProgress }) => {
  // ==========================================
  // Safety
  // ==========================================

  if (!weeklyProgress) {
    return <EmptyState />;
  }

  // ==========================================
  // Backend Data
  // ==========================================

  const overallProgress =
    Number(weeklyProgress.overallPercentage || 0);

  const lessons =
    weeklyProgress.lessons || {
      completed: 0,
      target: 0,
      percentage: 0,
    };

  const problems =
    weeklyProgress.problems || {
      completed: 0,
      target: 0,
      percentage: 0,
    };

  const tests =
    weeklyProgress.tests || {
      completed: 0,
      target: 0,
      percentage: 0,
    };

  // ==========================================
  // Convert Backend Data to UI Data
  // ==========================================

  const stats = [
    {
      id: 1,
      title: "Lessons Completed",
      completed: Number(lessons.completed || 0),
      total: Number(lessons.target || 0),
      percentage: Number(lessons.percentage || 0),
    },

    {
      id: 2,
      title: "Problems Solved",
      completed: Number(problems.completed || 0),
      total: Number(problems.target || 0),
      percentage: Number(problems.percentage || 0),
    },

    {
      id: 3,
      title: "Test Completed",
      completed: Number(tests.completed || 0),
      total: Number(tests.target || 0),
      percentage: Number(tests.percentage || 0),
    },
  ];

  return (
    <section className="weekly-progress">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="progress-header">

        <h2>
          Weekly Progress
        </h2>

        {/* integrate in future */}

        {/* <button className="add-target">
          Add Target
        </button> */}

      </div>

      {/* ========================================
          BODY
      ======================================== */}

      <div className="progress-body">

        {/* ======================================
            OVERALL PROGRESS
        ====================================== */}

        <div className="overall-progress">

          <div
            className="progress-circle"
            style={{
              background: `conic-gradient(
                #6C4DFF ${overallProgress * 3.6}deg,
                #ECECEC 0deg
              )`,
            }}
          >

            <div className="circle-inner">

              <h1>
                {overallProgress}%
              </h1>

              <span>
                Completed
              </span>

            </div>

          </div>

        </div>

        {/* ======================================
            PROGRESS LIST
        ====================================== */}

        <div className="progress-list">

          {stats.map((item) => (

            <div
              className="progress-item"
              key={item.id}
            >

              {/* Title + Count */}

              <div className="title-row">

                <h4>
                  {item.title}
                </h4>

                <span>
                  {item.completed} / {item.total}
                </span>

              </div>

              {/* Progress Bar */}

              <div className="bar">

                <div
                  className="fill"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WeeklyProgress;