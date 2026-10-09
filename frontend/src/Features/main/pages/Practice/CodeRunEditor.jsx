import React from 'react'
import CommonNavbar from '../../components/Navbar/CommonNavbar'
import LeftPartEditor from '../../components/Practice/CodeEditor/LeftPartEditor'
import EditorSection from '../../components/Practice/CodeEditor/EditorSection'
import { useParams } from 'react-router'
import '../../styles/Practice/CodeEditor/Home.scss'
import { useSingleProblem } from '../../Hooks/Practice/usePractice'

const CodeRunEditor = () => {
    const { slug, difficulty, problemSlug } = useParams()

    // capital letter mein convert
    const capitalize = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const {data,isLoading,isError,error} = useSingleProblem(slug, problemSlug);

    console.log(data)

    //current questions 
    const problemData = data?.problem || [];

    return (
        <div className='practice-right'>
            <CommonNavbar title={`Code Practice ${">"} ${capitalize(slug)} ${">"} ${capitalize(difficulty)}`} title2={capitalize(problemSlug)} color={"dark-white"} size={"small"}/>

            {/* main content section here */}

            {/* <div className="main-content"> */}

                <div className="all-code-setup">

                    <LeftPartEditor title={problemSlug} difficulty={difficulty} question={problemData}/>
                    <EditorSection question={problemData}/>
                    
                </div>
            </div>

        // </div>
    )
}

export default CodeRunEditor
