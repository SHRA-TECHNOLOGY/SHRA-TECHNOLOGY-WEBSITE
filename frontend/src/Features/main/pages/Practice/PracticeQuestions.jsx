import React,{useState} from 'react'
import CommonNavbar from '../../components/Navbar/CommonNavbar'
import { useParams } from 'react-router'
import { Search } from 'lucide-react'
import QuestionsList from '../../components/Practice/PracticeQuestions/QuestionsList'
import '../../styles/Practice/PracticeQuestions/Home.scss'

const PracticeQuestions = () => {

  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("All")

  // const currentLanguage = languagesData.find((item) => item.slug === language);

  const currentLanguage = []
  const Icon = currentLanguage?.Icon;
  
  return (
    <div className='practice-right'>

      <CommonNavbar title={"Code Practice"} title2={slug.charAt(0).toUpperCase() + slug.slice(1)} color={"dark-white"} />
    
      {/* main content section here */}

      <div className="practice-main-content">

        {/* search and title section here */}

        <div className="title-search-section">

          <div className="title-section">
            {Icon && (
              <Icon
                size={40}
                color={currentLanguage.color}
                strokeWidth={2}
              />
            )}
            <h2>{slug.charAt(0).toUpperCase() + slug.slice(1)}</h2>
          </div>

          <div className="practice-search-box">

            <Search className='Icon' />
            <input type="text" placeholder={`Search in ${slug.charAt(0).toUpperCase() + slug.slice(1)} problems...`} />
          </div>

        </div>

{/* question types tab */}

        <div className="classes-status questions-types">
          <button className={activeTab === "All" ? "active" : ""} onClick={() => setActiveTab("All")}>All</button>

          <button className={activeTab === "Easy" ? "active" : ""} onClick={() => setActiveTab("Easy")}>Easy</button>

          <button className={activeTab === "Medium" ? "active" : ''} onClick={() => setActiveTab("Medium")}>Medium</button>

          <button className={activeTab === "Hard" ? "active" : ''} onClick={() => setActiveTab("Hard")}>Hard</button>
        </div>

        <QuestionsList activeTab={activeTab} slug={slug}/>

      </div>


    </div>
  )
}

export default PracticeQuestions
