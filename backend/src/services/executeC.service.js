const fs = require("fs/promises");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { spawn } = require("child_process");

const normalizeOutput = (output = "") => {
  return output
    .replace(/\r\n/g, "\n")
    .trim()
    .replace(/\s+/g, "");
};

/*
|--------------------------------------------------------------------------
| Parse GCC Error
|--------------------------------------------------------------------------
*/

const parseGccError = (stderr = "") => {
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
    Example GCC error:

    /workspace/main.c:8:13: error:
    passing argument 1 of 'printf' makes pointer from integer
    without a cast [-Wint-conversion]
  */

  const match = stderr.match(
    /\/workspace\/main\.c:(\d+):(\d+):\s*(error|warning):\s*(.*)/
  );

  if (!match) {
    return {
      line: null,
      column: null,
      type: "Compilation Error",
      message: stderr.trim(),
      raw: stderr.trim(),
    };
  }

  const line = Number(match[1]);
  const column = Number(match[2]);
  const type = match[3];
  const message = match[4].trim();

  return {
    line,
    column,
    type,
    message,
    raw: stderr.trim(),
  };
};

/*
|--------------------------------------------------------------------------
| Docker C Execution
|--------------------------------------------------------------------------
*/

const runDockerCCommand = ({
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

      // Read-only root filesystem
      "--read-only",

      // GCC needs writable /tmp
      "--tmpfs",
      "/tmp:rw,exec,nosuid,nodev,size=64m",

      "--security-opt",
      "no-new-privileges",

      "--cap-drop",
      "ALL",

      "--name",
      containerName,

      // Source code
      "-v",
      `${workspace}:/workspace:ro`,

      // GCC image
      "gcc:latest",

      // Compile first, then execute
      "sh",
      "-c",
      "gcc /workspace/main.c -o /tmp/main && /tmp/main",
    ];

    const child = spawn("docker", dockerArgs, {
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";
    let finished = false;

    /*
    |--------------------------------------------------------------------------
    | Timeout
    |--------------------------------------------------------------------------
    */

    const timer = setTimeout(() => {
      if (finished) return;

      finished = true;

      child.kill();

      spawn(
        "docker",
        ["rm", "-f", containerName],
        {
          windowsHide: true,
        }
      );

      resolve({
        status: "Time Limit Exceeded",
        stdout,
        stderr: "Code execution timed out.",
      });
    }, timeout);

    /*
    |--------------------------------------------------------------------------
    | STDOUT
    |--------------------------------------------------------------------------
    */

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    /*
    |--------------------------------------------------------------------------
    | STDERR
    |--------------------------------------------------------------------------
    */

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    /*
    |--------------------------------------------------------------------------
    | Docker Error
    |--------------------------------------------------------------------------
    */

    child.on("error", (error) => {
      if (finished) return;

      finished = true;
      clearTimeout(timer);

      resolve({
        status: "Runtime Error",
        stdout,
        stderr: error.message,
      });
    });

    /*
    |--------------------------------------------------------------------------
    | Process Close
    |--------------------------------------------------------------------------
    */

    child.on("close", (code) => {
      if (finished) return;

      finished = true;
      clearTimeout(timer);

      /*
      |--------------------------------------------------------------------------
      | Code 0 = Program Successfully Executed
      |--------------------------------------------------------------------------
      */

      if (code === 0) {
        resolve({
          status: "Success",
          stdout,
          stderr,
        });

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | Compilation Error
      |--------------------------------------------------------------------------
      |
      | GCC compilation happens before program execution.
      | If GCC fails, /tmp/main is never created.
      |
      */

      if (stderr) {
        const gccError = parseGccError(stderr);

        resolve({
          status: "Compilation Error",
          stdout,
          stderr,
          errorDetails: gccError,
        });

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | Runtime Error
      |--------------------------------------------------------------------------
      */

      resolve({
        status: "Runtime Error",
        stdout,
        stderr,
      });
    });

    /*
    |--------------------------------------------------------------------------
    | Input
    |--------------------------------------------------------------------------
    */

    const normalizedInput = (input || "")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t");

    child.stdin.write(normalizedInput);
    child.stdin.end();
  });
};

/*
|--------------------------------------------------------------------------
| Execute C
|--------------------------------------------------------------------------
*/

const executeC = async ({ code, testCases }) => {
  const workspace = await fs.mkdtemp(
    path.join(
      os.tmpdir(),
      "shra-practice-c-"
    )
  );

  try {
    /*
    |--------------------------------------------------------------------------
    | Create main.c
    |--------------------------------------------------------------------------
    */

    const codePath = path.join(
      workspace,
      "main.c"
    );

    await fs.writeFile(
      codePath,
      code,
      "utf8"
    );

    const results = [];

    /*
    |--------------------------------------------------------------------------
    | Run Test Cases
    |--------------------------------------------------------------------------
    */

    for (
      let i = 0;
      i < testCases.length;
      i++
    ) {
      const testCase = testCases[i];

      const containerName =
        `shra-c-${crypto.randomUUID()}`;

      const execution =
        await runDockerCCommand({
          containerName,
          workspace,
          input: testCase.input,
          timeout: 5000,
        });

      /*
      |--------------------------------------------------------------------------
      | Output Compare
      |--------------------------------------------------------------------------
      */

      const actualOutput =
        normalizeOutput(
          execution.stdout
        );

      const expectedOutput =
        normalizeOutput(
          testCase.expectedOutput
        );

      const passed =
        execution.status === "Success" &&
        actualOutput === expectedOutput;

      /*
      |--------------------------------------------------------------------------
      | Result
      |--------------------------------------------------------------------------
      */

      results.push({
        testCase: i + 1,

        input: testCase.input,

        expectedOutput,

        actualOutput,

        passed,

        status: execution.status,

        error:
          execution.stderr || null,

        errorDetails:
          execution.errorDetails || null,
      });

      /*
      |--------------------------------------------------------------------------
      | Stop on Error
      |--------------------------------------------------------------------------
      */

      if (
        execution.status !== "Success"
      ) {
        break;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Final Result
    |--------------------------------------------------------------------------
    */

    const passedTestCases =
      results.filter(
        (item) => item.passed
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
    /*
    |--------------------------------------------------------------------------
    | Delete Workspace
    |--------------------------------------------------------------------------
    */

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
  executeC,
};