import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

import "../../../styles/Practice/CodeEditor/MonacoEditor.scss";

const MonacoEditor = ({
  language,
  theme,
  code,
  setCode,
  editorError,
}) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // ==========================================
  // MONACO MOUNT
  // ==========================================

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    window.monacoEditor = editor;

    const node = editor.getDomNode();

    if (node) {
      console.log(
        "EDITOR RECT:",
        node.getBoundingClientRect()
      );

      editor.layout({
        width: node.clientWidth,
        height: 420,
      });
    }

    console.log(
      "LAYOUT:",
      editor.getLayoutInfo()
    );

    console.log(
      "VALUE:",
      editor.getValue()
    );
  };

  // ==========================================
  // ERROR MARKER
  // ==========================================

  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (!editor || !monaco) {
      return;
    }

    const model = editor.getModel();

    if (!model) {
      return;
    }

    // Clear previous errors
    if (!editorError?.line) {
      monaco.editor.setModelMarkers(
        model,
        "shra-code-error",
        []
      );

      return;
    }

    const line = Number(
      editorError.line
    );

    const column = Number(
      editorError.column || 1
    );

    // Invalid line protection
    if (
      line < 1 ||
      line > model.getLineCount()
    ) {
      return;
    }

    const lineMaxColumn =
      model.getLineMaxColumn(line);

    // ==========================================
    // Exact error position
    // ==========================================

    const startColumn = Math.min(
      column,
      lineMaxColumn
    );

    const endColumn = Math.min(
      column + 1,
      lineMaxColumn
    );

    monaco.editor.setModelMarkers(
      model,
      "shra-code-error",
      [
        {
          startLineNumber: line,
          startColumn,
          endLineNumber: line,
          endColumn:
            endColumn > startColumn
              ? endColumn
              : lineMaxColumn,

          message:
            editorError.message ||
            "Compilation Error",

          severity:
            monaco.MarkerSeverity.Error,

          source: "GCC",
        },
      ]
    );

    // Error line par scroll
    editor.revealLineInCenter(line);

  }, [editorError, code]);

  // ==========================================
  // CLEAR MARKER ON LANGUAGE CHANGE
  // ==========================================

  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (!editor || !monaco) {
      return;
    }

    const model = editor.getModel();

    if (!model) {
      return;
    }

    monaco.editor.setModelMarkers(
      model,
      "shra-code-error",
      []
    );

  }, [language]);

  // ==========================================
  // EDITOR
  // ==========================================

  return (
    <div
      style={{
        width: "100%",
        height: "420px",
        minWidth: 0,
        position: "relative",
      }}
    >
      <Editor
        height="420px"
        width="100%"
        language={language}
        theme={theme}
        value={code || ""}
        onChange={(value) =>
          setCode(value ?? "")
        }

        // IMPORTANT
        onMount={handleEditorMount}

        options={{
          fontSize: 15,

          minimap: {
            enabled: false,
          },

          automaticLayout: true,

          lineNumbers: "on",

          wordWrap: "on",

          scrollBeyondLastLine: false,

          // Error marker ke liye
          glyphMargin: true,

          // Error squiggly visible
          renderValidationDecorations: "on",

          // Better editor
          folding: true,

          smoothScrolling: true,
        }}
      />
    </div>
  );
};

export default MonacoEditor;