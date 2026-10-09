import { Play,CloudUpload } from 'lucide-react'

const EditorActions = ({
  runCode,
  submitCode,
  runPending,
  submitPending,
}) => {

  return (

    <div className="editor-actions">

      <button
        onClick={runCode} className='run-btn'
      >
        {runPending
          ? ("Running...")
          : (<>
            <Play size={16}/> Run Code
          </>)}
      </button>

      <button
        onClick={submitCode}
        className='submit-code'
        >
        {submitPending
          ? ("Submitting...")
          : (<>
            <CloudUpload size={20}/> Submit Code
          </>)}
      </button>

    </div>

  );
};

export default EditorActions;