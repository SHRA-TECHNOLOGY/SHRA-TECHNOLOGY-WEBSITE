import { useEffect, useState } from "react";
import EditorHeader from "./EditorHeader";
import MonacoEditor from "./MonacoEditor";
import EditorActions from "./EditorActions";
import "../../../styles/Practice/CodeEditor/EditorSection.scss";

import { useRunPracticeCode, useSubmitPracticeCode } from "../../../Hooks/Practice/usePractice";

const EditorSection = ({ question }) => {

  const [language, setLanguage] = useState(
    question?.language || "python"
  );
  const [theme, setTheme] = useState("vs-dark");

  const [code, setCode] = useState(
    question?.starterCode?.python || ""
  );

  const [output, setOutput] = useState(null);
  const [status, setStatus] = useState("");
  const [editorError, setEditorError] = useState(null);

  // ==========================================
  // RUN CODE HOOK
  // ==========================================

  const {
    mutateAsync,
    isPending: runPending,
  } = useRunPracticeCode();

  const {
    mutateAsync: submitMutateAsync,
    isPending: submitPending,
  } = useSubmitPracticeCode();

  // set language when question changes
  
  useEffect(() => {
    // Problem open/change hui
    if (!question?.language) return;

    setLanguage(question.language);
  }, [question]);

  // ==========================================
  // LOAD STARTER CODE
  // ==========================================

  useEffect(() => {

    if (!question?.starterCode) return;

    setCode(
      question.starterCode[language] || ""
    );

    setOutput(null);
    setStatus("");
    setEditorError(null);

  }, [question, language]);

  // ==========================================
  // LANGUAGE CHANGE
  // ==========================================

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // ==========================================
  // FORMAT BACKEND RESULT
  // ==========================================

  const formatResult = (result) => {
    if (!result) {
      return {
        status: "Executed",
        passed: 0,
        total: 0,
        message: "Code executed successfully.",
        errorDetails: null,
      };
    }

    const passed = result?.passedTestCases ?? 0;
    const total = result?.totalTestCases ?? 0;

    const failedTest = result?.results?.find(
      (test) => test?.passed === false
    );

    if (failedTest) {
      let message =
        "Your code could not be executed.";

      switch (failedTest?.status) {
        case "Wrong Answer":
          message =
            "Your output does not match the expected output.";
          break;

        case "Runtime Error":
          message =
            "Your code encountered a runtime error.";
          break;

        case "Compilation Error":
          message =
            "Your code has a compilation error.";
          break;

        case "Time Limit Exceeded":
          message =
            "Your code exceeded the time limit.";
          break;

        default:
          message =
            "Your code could not be executed.";
      }

      return {
        status: failedTest?.status || "Error",
        passed,
        total,
        message,

        // IMPORTANT
        errorDetails:
          failedTest?.errorDetails || null,

        error:
          failedTest?.error || null,

        failedTest,
      };
    }

    if (total > 0 && passed === total) {
      return {
        status: "Accepted",
        passed,
        total,
        message: "All sample test cases passed.",
        errorDetails: null,
      };
    }

    return {
      status: "Wrong Answer",
      passed,
      total,
      message: "Some test cases failed.",
      errorDetails: null,
    };
  };

  // ==========================================
  // RUN CODE
  // ==========================================

  const runCode = async () => {

    // Empty code
    if (!code.trim()) {

      const result = {
        status: "Error",
        passed: 0,
        total: 0,
        message: "Please write some code first.",
      };

      setStatus("Error");
      setOutput(result);

      return;
    }

    try {

      setOutput(null);
      setStatus("");

      // ----------------------------------------
      // Send code to backend
      // ----------------------------------------

      const data = await mutateAsync({
        problemId: question?._id,
        language,
        code,
      });

      console.log("RUN CODE RESPONSE:", data);

      // ----------------------------------------
      // Backend returned error
      // ----------------------------------------

      if (data?.success === false) {

        const result = {
          status: "Error",
          passed: 0,
          total: 0,
          message:
            data?.message ||
            "Code execution failed.",
        };

        setStatus("Error");
        setOutput(result);

        return;
      }

      // ----------------------------------------
      // Format execution result
      // ----------------------------------------

      const result = formatResult(
        data?.result
      );

      setStatus(result.status);
      setOutput(result);

      setEditorError(
        result?.errorDetails || null
      );

      // Exact compiler/runtime error
      const failedTest = data?.result?.results?.find(
        (test) => test?.passed === false
      );

      setEditorError(
        failedTest?.errorDetails || null
      );

    } catch (error) {

      console.error(
        "Run Code Error:",
        error
      );

      const result = {
        status: "Error",
        passed: 0,
        total: 0,
        message:
          error?.response?.data?.message ||
          "Code execution failed.",
      };

      setStatus("Error");
      setOutput(result);
    }
  };

  // ==========================================
  // RESULT BOX CLASS
  // ==========================================

  const getResultClass = () => {

    if (runPending) {
      return "loading";
    }

    if (status === "Accepted") {
      return "accepted";
    }

    if (
      status === "Wrong Answer" ||
      status === "Runtime Error" ||
      status === "Compilation Error" ||
      status === "Error"
    ) {
      return "error";
    }

    return "executed";
  };


  const submitCode = async () => {

    // ==========================================
    // EMPTY CODE
    // ==========================================

    if (!code.trim()) {

      const result = {
        status: "Error",
        passed: 0,
        total: 0,
        message: "Please write some code first.",
      };

      setStatus("Error");
      setOutput(result);

      return;
    }

    // ==========================================
    // QUESTION CHECK
    // ==========================================

    if (!question?._id) {

      const result = {
        status: "Error",
        passed: 0,
        total: 0,
        message: "Problem ID is missing.",
      };

      setStatus("Error");
      setOutput(result);

      return;
    }

    try {

      setOutput(null);
      setStatus("");

      // ==========================================
      // SUBMIT CODE TO BACKEND
      // ==========================================

      const data = await submitMutateAsync({

        problemId: question._id,

        language,

        code,

      });

      console.log(
        "SUBMIT CODE RESPONSE:",
        data
      );

      // ==========================================
      // BACKEND ERROR
      // ==========================================

      if (data?.success === false) {

        const result = {
          status: "Error",
          passed: 0,
          total: 0,
          message:
            data?.message ||
            "Code submission failed.",
        };

        setStatus("Error");
        setOutput(result);

        return;
      }

      // ==========================================
      // FORMAT SUBMIT RESULT
      // ==========================================

      const result = formatResult(
        data?.result
      );

      setStatus(result.status);
      setOutput(result);

    } catch (error) {

      console.error(
        "Submit Code Error:",
        error
      );

      const result = {
        status: "Error",
        passed: 0,
        total: 0,
        message:
          error?.response?.data?.message ||
          "Code submission failed.",
      };

      setStatus("Error");
      setOutput(result);

    }

  };
  return (
    <section className="editor-section">

      {/* ======================================
          EDITOR HEADER
      ====================================== */}

      <EditorHeader
        language={language}
        theme={theme}
        setTheme={setTheme}
        onLanguageChange={handleLanguageChange}
      />

      {/* ======================================
          MONACO EDITOR
      ====================================== */}

      <MonacoEditor
        language={language}
        theme={theme}
        code={code}
        setCode={setCode}
        editorError={editorError}
      />

      {/* ======================================
          ACTION BUTTONS
      ====================================== */}

      <EditorActions
        runPending={runPending}
        runCode={runCode}
        submitCode={submitCode}
        submitPending={submitPending}
      />

      {/* ======================================
          RUN RESULT
      ====================================== */}

      {(runPending || status || output) && (

        <div
          className={`code-result-box ${getResultClass()}`}
        >

          {/* ====================================
              RESULT HEADER
          ==================================== */}

          <div className="code-result-header">

            <div className="result-title">

              <span className="result-dot"></span>

              <span>
                {runPending
                  ? "Running Code..."
                  : status || "Result"}
              </span>

            </div>

            {!runPending && status && (

              <span className="result-status">
                {status}
              </span>

            )}

          </div>

          {/* ====================================
              RESULT BODY
          ==================================== */}

          <div className="code-result-body">

            {runPending ? (

              <div className="result-loading">

                <span className="loading-spinner"></span>

                <span>
                  Executing your code...
                </span>

              </div>

            ) : output ? (

              <div className="practice-result-content">

                {/* TEST CASES */}

                <div className="result-stat">

                  <span className="result-stat-label">
                    Test Cases
                  </span>

                  <strong>
                    {output?.passed ?? 0}

                    <span>
                      {" "}
                      / {output?.total ?? 0}
                    </span>
                  </strong>

                </div>

                {/* MESSAGE */}

                <div className="result-message">
                  <div className="result-main-message">
                    {output?.message}
                  </div>

                  {output?.errorDetails && (
                    <div className="result-error-details">
                      <div className="error-location">
                        Line {output.errorDetails.line}
                        {output.errorDetails.column
                          ? `, Column ${output.errorDetails.column}`
                          : ""}
                      </div>

                      <div className="error-description">
                        {output.errorDetails.message}
                      </div>
                    </div>
                  )}


                </div>

              </div>

            ) : null}

          </div>

        </div>

      )}

    </section>
  );
};

export default EditorSection;