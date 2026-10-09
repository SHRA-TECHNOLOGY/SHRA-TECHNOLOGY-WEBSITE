const fs = require("fs/promises");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { spawn } = require("child_process");


// ======================================================
// NORMALIZE OUTPUT
// ======================================================

const normalizeOutput = (output = "") => {
  return output
    .replace(/\r\n/g, "\n")
    .trim()
    .replace(/\s+/g, "");
};


// ======================================================
// PARSE PYTHON ERROR
// ======================================================

const parsePythonError = (stderr = "") => {
  if (!stderr) {
    return {
      line: null,
      column: null,
      type: "Unknown Error",
      message: "Unknown error",
      raw: "",
    };
  }

  /*
    Python traceback example:

    Traceback (most recent call last):
      File "/workspace/main.py", line 8, in <module>
        print(a / 0)
              ~^~~
    ZeroDivisionError: division by zero
  */

  const lineMatch = stderr.match(
    /File "\/workspace\/main\.py", line (\d+)/
  );

  const line = lineMatch
    ? Number(lineMatch[1])
    : null;


  // ------------------------------------------------------
  // Error type + message
  // ------------------------------------------------------

  const lines = stderr
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let errorType = "Python Error";
  let errorMessage = stderr.trim();

  /*
    Example:

    ZeroDivisionError: division by zero
  */

  const errorLine = [...lines]
    .reverse()
    .find((line) =>
      /^[A-Za-z_][A-Za-z0-9_]*(Error|Exception|Warning):/.test(
        line
      )
    );

  if (errorLine) {
    const match = errorLine.match(
      /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/
    );

    if (match) {
      errorType = match[1];
      errorMessage = match[2];
    }
  }


  // ------------------------------------------------------
  // Try to find column from Python 3.11+ traceback
  // ------------------------------------------------------

  let column = null;

  /*
    Python may show:

        print(a / 0)
              ~^~~
  */

  const caretLine = lines.find(
    (line) =>
      line.includes("^") ||
      line.includes("~")
  );

  if (caretLine) {
    const caretIndex =
      caretLine.indexOf("^");

    if (caretIndex !== -1) {
      column = caretIndex + 1;
    }
  }


  return {
    line,
    column,

    type: errorType,

    message: errorMessage,

    raw: stderr.trim(),
  };
};


// ======================================================
// DOCKER PYTHON EXECUTION
// ======================================================

const runDockerCommand = ({
  containerName,
  workspace,
  input,
  timeout = 5000,
}) => {

  return new Promise((resolve) => {

    const dockerArgs = [
      "run",
      "--rm",
      "-i",

      // Security
      "--network",
      "none",

      "--memory",
      "128m",

      "--cpus",
      "0.5",

      "--pids-limit",
      "64",

      // Read-only filesystem
      "--read-only",

      // Security
      "--security-opt",
      "no-new-privileges",

      "--cap-drop",
      "ALL",

      "--name",
      containerName,

      // Source code
      "-v",
      `${workspace}:/workspace:ro`,

      // Python image
      "python:3.12-alpine",

      // Python
      "python",

      "-B",

      "/workspace/main.py",
    ];


    const child = spawn(
      "docker",
      dockerArgs,
      {
        windowsHide: true,
      }
    );


    let stdout = "";
    let stderr = "";
    let finished = false;


    // ====================================================
    // TIMEOUT
    // ====================================================

    const timer = setTimeout(() => {

      if (finished) return;

      finished = true;

      child.kill();

      spawn(
        "docker",
        [
          "rm",
          "-f",
          containerName,
        ],
        {
          windowsHide: true,
        }
      );

      resolve({
        status: "Time Limit Exceeded",

        stdout,

        stderr:
          "Code execution timed out.",
      });

    }, timeout);


    // ====================================================
    // STDOUT
    // ====================================================

    child.stdout.on(
      "data",
      (data) => {
        stdout += data.toString();
      }
    );


    // ====================================================
    // STDERR
    // ====================================================

    child.stderr.on(
      "data",
      (data) => {
        stderr += data.toString();
      }
    );


    // ====================================================
    // DOCKER ERROR
    // ====================================================

    child.on(
      "error",
      (error) => {

        if (finished) return;

        finished = true;

        clearTimeout(timer);

        resolve({
          status: "Runtime Error",

          stdout,

          stderr:
            error.message,
        });

      }
    );


    // ====================================================
    // PROCESS CLOSE
    // ====================================================

    child.on(
      "close",
      (code) => {

        if (finished) return;

        finished = true;

        clearTimeout(timer);


        // -----------------------------------------------
        // SUCCESS
        // -----------------------------------------------

        if (code === 0) {

          resolve({
            status: "Success",

            stdout,

            stderr,
          });

          return;
        }


        // -----------------------------------------------
        // PYTHON ERROR
        // -----------------------------------------------

        if (stderr) {

          const pythonError =
            parsePythonError(stderr);

          resolve({
            status: "Runtime Error",

            stdout,

            stderr,

            errorDetails:
              pythonError,
          });

          return;
        }


        // -----------------------------------------------
        // UNKNOWN RUNTIME ERROR
        // -----------------------------------------------

        resolve({
          status: "Runtime Error",

          stdout,

          stderr,
        });

      }
    );


    // ====================================================
    // INPUT
    // ====================================================

    const normalizedInput =
      (input || "")
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t");


    child.stdin.write(
      normalizedInput
    );

    child.stdin.end();

  });
};


// ======================================================
// EXECUTE PYTHON
// ======================================================

const executePython = async ({
  code,
  testCases,
}) => {

  const workspace =
    await fs.mkdtemp(
      path.join(
        os.tmpdir(),
        "shra-practice-"
      )
    );


  try {

    // ==================================================
    // CREATE main.py
    // ==================================================

    const codePath =
      path.join(
        workspace,
        "main.py"
      );


    await fs.writeFile(
      codePath,
      code,
      "utf8"
    );


    const results = [];


    // ==================================================
    // RUN TEST CASES
    // ==================================================

    for (
      let i = 0;
      i < testCases.length;
      i++
    ) {

      const testCase =
        testCases[i];


      const containerName =
        `shra-python-${crypto.randomUUID()}`;


      const execution =
        await runDockerCommand({
          containerName,

          workspace,

          input:
            testCase.input,

          timeout: 5000,
        });


      // =================================================
      // OUTPUT
      // =================================================

      const actualOutput =
        normalizeOutput(
          execution.stdout
        );


      const expectedOutput =
        normalizeOutput(
          testCase.expectedOutput
        );


      const passed =
        execution.status ===
          "Success" &&
        actualOutput ===
          expectedOutput;


      // =================================================
      // RESULT
      // =================================================

      results.push({

        testCase:
          i + 1,

        input:
          testCase.input,

        expectedOutput,

        actualOutput,

        passed,

        status:
          execution.status,

        error:
          execution.stderr ||
          null,

        errorDetails:
          execution.errorDetails ||
          null,

      });


      // =================================================
      // STOP ON ERROR
      // =================================================

      if (
        execution.status !==
        "Success"
      ) {
        break;
      }

    }


    // ==================================================
    // FINAL RESULT
    // ==================================================

    const passedTestCases =
      results.filter(
        (item) =>
          item.passed
      ).length;


    return {

      passedTestCases,

      totalTestCases:
        testCases.length,

      results,

      allPassed:
        passedTestCases ===
        testCases.length,

    };


  } finally {

    // ==================================================
    // DELETE WORKSPACE
    // ==================================================

    await fs.rm(
      workspace,
      {
        recursive: true,
        force: true,
      }
    );

  }
};


module.exports = {
  executePython,
};