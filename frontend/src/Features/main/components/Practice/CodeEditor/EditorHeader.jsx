import {useNavigate} from "react-router";

const EditorHeader = ({
  language,
  onLanguageChange,
  theme,
  setTheme,
}) => {

  const navigate = useNavigate();

  return (

    <div className="editor-header">

      <select
        value={language}
        onChange={(e) =>
          onLanguageChange(e.target.value)
        }
      >
        <option value="python">python</option>
        <option value="c">c</option>
      </select>

      <button
        onClick={() =>
          setTheme(
            theme === "vs-dark"
              ? "vs"
              : "vs-dark"
          )
        }
      >
        {theme === "vs-dark" ? "Dark" : "Light"}
      </button>

      <button onClick={() => navigate('/practice')}>Cancel</button>

    </div>

  );
};

export default EditorHeader;
